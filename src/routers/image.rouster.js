import express from "express";
import imageController from "../controllers/image.controller.js";
import protect from "../common/middleware/protect.middleware.js";

const imageRouter = express.Router();

// GET danh sách ảnh về
imageRouter.get("/list-image", imageController.listImage);

// GET tìm kiếm danh sách ảnh theo tên
imageRouter.get("/list-image/:ten_hinh", protect, imageController.ImageByName);

// GET thông tin ảnh và người tạo ảnh bằng ID ảnh
imageRouter.get(
  "/image-with-user/:hinh_id",
  protect,
  imageController.ImageWithUser
);
export default imageRouter;
