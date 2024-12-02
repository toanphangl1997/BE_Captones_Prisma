import prisma from "../common/prisma/init.prisma.js";

const imageService = {
  listImage: async () => {
    const imageList = await prisma.hinh_anh.findMany({});

    return imageList;
  },

  ImageByName: async (ten_hinh) => {
    // Tìm kiếm ảnh theo tên, tìm thấy một ảnh đầu tiên có tên khớp
    const imageByName = await prisma.hinh_anh.findFirst({
      where: {
        ten_hinh: ten_hinh, // Tìm ảnh theo tên chính xác
      },
    });

    // Nếu không tìm thấy, trả về null
    if (!imageByName) {
      return null;
    }

    return imageByName;
  },

  ImageWithUser: async (hinh_id) => {
    const imageWithUser = await prisma.hinh_anh.findUnique({
      where: {
        hinh_id: parseInt(hinh_id), // Đảm bảo ID là kiểu số
      },
      include: {
        nguoi_dung: true, // Kết nối bảng "nguoi_dung" để lấy thông tin người dùng qua `nguoi_dung_id`
      },
    });

    if (!imageWithUser) {
      throw new Error(`Không tìm thấy hình ảnh với ID: ${hinh_id}`);
    }

    return imageWithUser;
  },
};

export default imageService;
