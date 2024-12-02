import express from "express";
import { commentController } from "../controllers/comment.controller.js";
import protect from "../common/middleware/protect.middleware.js";

const commentRouter = express.Router();

// GET thông tin bình luận theo ID ảnh
commentRouter.get(
  "/comment-with-idimage/:hinh_id",
  protect,
  commentController.getCommentWithIdImage
);

// POST để lưu thông tin bình luận của người dùng với hình ảnh
commentRouter.post(
  "/save-comment-withimage/:hinh_id",
  protect,
  commentController.saveCommentWithImage
);

export default commentRouter;
