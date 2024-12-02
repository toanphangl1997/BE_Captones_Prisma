import prisma from "../common/prisma/init.prisma.js";

export const userService = {
  getInfoUser: async (req) => {
    const { nguoi_dung_id } = req.params;
    const getInfo = await prisma.nguoi_dung.findMany({
      where: {
        nguoi_dung_id: nguoi_dung_id,
      },
    });
    return getInfo;
  },

  getInfoUserByID: async (nguoi_dung_id) => {
    const getInfoUserID = await prisma.nguoi_dung.findUnique({
      where: {
        nguoi_dung_id: parseInt(nguoi_dung_id),
      },
    });
    if (!getInfoUserID) {
      throw new Error(`Không tìm thấy người dùng với id: ${nguoi_dung_id}`);
    }
    return getInfoUserID;
  },

  getListImageSaveByID: async (nguoi_dung_id) => {
    if (!nguoi_dung_id) {
      throw new Error("Nguoi dung id không được cung cấp.");
    }
    // Truy vấn tất cả các ảnh đã lưu của người dùng
    const getListImageSaveByID = await prisma.luu_anh.findMany({
      where: {
        nguoi_dung_id: parseInt(nguoi_dung_id),
      },
      include: {
        hinh_anh: true,
      },
      orderBy: {
        ngay_luu: "desc",
      },
    });
    console.log("Query", getListImageSaveByID);
    // Kiểm tra nếu không có ảnh nào được lưu
    if (!getListImageSaveByID || getListImageSaveByID.length === 0) {
      throw new Error(
        `Không tìm thấy ảnh đã lưu với ID người dùng: ${nguoi_dung_id}`
      );
    }
    // Trả về danh sách các ảnh đã lưu
    return getListImageSaveByID.map((item) => ({
      nguoi_dung_id: item.hinh_anh.nguoi_dung_id,
      hinh_id: item.hinh_anh.hinh_id,
      ten_hinh: item.hinh_anh.ten_hinh,
      duong_dan: item.hinh_anh.duong_dan,
      mo_ta: item.hinh_anh.mo_ta,
      ngay_luu: item.ngay_luu, // Bao gồm ngày lưu
    }));
  },

  getListImageCreatedByUser: async (nguoi_dung_id) => {
    if (!nguoi_dung_id) {
      throw new Error("Nguoi dung id không được cung cấp.");
    }

    // Truy vấn tất cả các ảnh đã tạo (chưa lưu) của người dùng
    const getListImageCreatedByID = await prisma.hinh_anh.findMany({
      where: {
        nguoi_dung_id: parseInt(nguoi_dung_id), // Lọc theo nguoi_dung_id
      },
    });

    // Kiểm tra nếu không có ảnh nào được tạo
    if (!getListImageCreatedByID || getListImageCreatedByID.length === 0) {
      throw new Error(
        `Không tìm thấy ảnh đã tạo với ID người dùng: ${nguoi_dung_id}`
      );
    }

    // Trả về danh sách các ảnh đã tạo
    return getListImageCreatedByID.map((item) => ({
      hinh_id: item.hinh_id,
      ten_hinh: item.ten_hinh,
      duong_dan: item.duong_dan,
      mo_ta: item.mo_ta,
    }));
  },

  deleteImageById: async (hinh_id) => {
    try {
      // Kiểm tra nếu không có ID
      if (!hinh_id) {
        throw new Error("Vui lòng cung cấp Id hình ảnh");
      }
      // Kiểm trả hình ảnh có tồn tại không
      const image = await prisma.hinh_anh.findUnique({
        where: {
          hinh_id: parseInt(hinh_id),
        },
      });
      if (!image) {
        throw new Error(`Hình ảnh với ID ${hinh_id} không tồn tại`);
      }
      // Kiểm tra nếu có bản ghi luên quan trong bảng khác ( binh_luan )
      const tablecomment = await prisma.binh_luan.findMany({
        where: {
          hinh_id: parseInt(hinh_id),
        },
      });

      if (tablecomment.length > 0) {
        throw new Error(
          `Không thể xóa ảnh vì có ${tablecomment.length} bình luận tham chiếu tới tình ảnh`
        );
      }
      // Kiểm tra nếu có bản ghi luên quan trong bảng khác ( luu_anh )
      const tableSaveImage = await prisma.luu_anh.findMany({
        where: {
          hinh_id: parseInt(hinh_id),
        },
      });

      if (tableSaveImage.length > 0) {
        throw new Error(
          `Không thể xóa ảnh vì có ${tableSaveImage.length} lưu ảnh tham chiếu tới tình ảnh`
        );
      }
      // Nếu không có ràng buộc,xóa hình ảnh
      const deleteImage = await prisma.hinh_anh.delete({
        where: {
          hinh_id: parseInt(hinh_id),
        },
      });
      return {
        success: true,
        message: "Xóa ảnh thành công",
        data: deleteImage,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  postPhotoForUser: async (req) => {
    const { nguoi_dung_id } = req.params; // Lấy ID người dùng từ params
    const { anh_dai_dien } = req.body; // Lấy dự liệu ảnh đại diện từ body

    try {
      // Kiểm tra nếu không có nguoi_dung_id hoặc anh_dai_dien
      if (!nguoi_dung_id || !anh_dai_dien) {
        throw new Error("Vui lòng cung cấp Id người dùng và ảnh đại diện");
      }
      // Cập nhật ảnh đại diện cho người dùng
      const postPhotoUser = await prisma.nguoi_dung.update({
        where: {
          nguoi_dung_id: parseInt(nguoi_dung_id),
        },
        data: {
          anh_dai_dien: anh_dai_dien, // Gửi dữ liệu cần cập nhật
        },
        select: {
          // Chỉ trả về những trường cần thiết
          nguoi_dung_id: true,
          anh_dai_dien: true,
        },
      });

      if (!postPhotoUser) {
        throw new Error(
          `Không thể thêm ảnh cho người dùng với ID: ${nguoi_dung_id}`
        );
      }

      return {
        success: true,
        message: "Thêm ảnh đại diện thành công",
        data: postPhotoUser,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },

  putInfoUser: async (req) => {
    const { nguoi_dung_id } = req.params; // Lấy ID từ params
    const { email, ho_ten, tuoi, anh_dai_dien } = req.body; // Lấy thông tin từ body

    try {
      // Kiểm tra dữ liệu đầu vào
      if (!email || !ho_ten || !tuoi || !anh_dai_dien) {
        throw new Error("Vui lòng cung cấp đầy đủ thông tin chỉnh sửa");
      }

      // Cập nhật thông tin người dùng
      const putInfoUser = await prisma.nguoi_dung.update({
        where: {
          nguoi_dung_id: parseInt(nguoi_dung_id),
        },
        data: {
          email,
          ho_ten,
          tuoi,
          anh_dai_dien,
        },
        select: {
          email: true,
          ho_ten: true,
          tuoi: true,
          anh_dai_dien: true,
        },
      });

      return {
        success: true,
        message: "Chỉnh sửa thông tin user thành công",
        data: putInfoUser,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  },
};
