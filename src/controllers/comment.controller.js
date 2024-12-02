import { responseSuccess } from "../common/helpers/response.helper.js";
import { commentService } from "../services/comment.service.js";

export const commentController = {
  getCommentWithIdImage: async function (req, res, next) {
    try {
      const { hinh_id } = req.params;
      if (!hinh_id) {
        return res.status(400).json({
          message: "Id ảnh không được cung cấp",
          code: 400,
        });
      }

      // Gọi service để tìm bình theo id ảnh
      const result = await commentService.getCommentWithIdImage(hinh_id);
      if (!result) {
        return res.status(404).json({
          message: `Không tìm thấy bình luận với ID: ${hinh_id}`,
          code: 404,
        });
      }
      const resData = responseSuccess(result, `Lấy bình luận thành công`);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  saveCommentWithImage: async (req, res, next) => {
    try {
      const { hinh_id } = req.params;
      const { noi_dung } = req.body;
      if (!hinh_id || !noi_dung) {
        return res.status(400).json({
          message: "Thiếu thông tin bình luận hoặc id hình ảnh",
          code: 400,
        });
      }
      const commentData = {
        hinh_id,
        noi_dung,
      };
      const result = await commentService.saveCommentWithImage(commentData);

      if (!result) {
        return res.status(500).json({
          message: "Không thể lưu bình luận",
          code: 500,
        });
      }
      const resData = responseSuccess(result, `Luu bình luận thành công`);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};
