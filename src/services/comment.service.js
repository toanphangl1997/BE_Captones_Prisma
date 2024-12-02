import prisma from "../common/prisma/init.prisma.js";

export const commentService = {
  getCommentWithIdImage: async function (hinh_id) {
    const commentWithIdImage = await prisma.binh_luan.findFirst({
      where: {
        hinh_id: parseInt(hinh_id),
      },
      include: {
        hinh_anh: true,
      },
    });

    if (!commentWithIdImage) {
      throw new Error(`Không tìm thấy bình luận với ID: ${hinh_id}`);
    }

    return commentWithIdImage;
  },

  saveCommentWithImage: async (commentData) => {
    const { hinh_id, noi_dung } = commentData;
    // Kiểm tra ID hình ảnh
    const saveCommentWithImage = await prisma.binh_luan.findFirst({
      where: {
        hinh_id: parseInt(hinh_id),
      },
    });

    if (!saveCommentWithImage) {
      throw new Error(`Không tìm thấy hình ảnh với ID ${hinh_id}`);
    }
    // Tạo comment mới
    const newComment = await prisma.binh_luan.create({
      data: {
        hinh_id: parseInt(hinh_id),
        noi_dung: noi_dung,
      },
      include: {
        hinh_anh: true,
      },
    });
    return newComment;
  },
};
