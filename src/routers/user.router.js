import express from "express";
import { userController } from "../controllers/user.controller.js";
import protect from "../common/middleware/protect.middleware.js";

const userRouter = express.Router();
// GET thông tin user
userRouter.get("/info", userController.getInfoUser);
// GET thông tin user theo id
userRouter.get("/info/:nguoi_dung_id", protect, userController.getInfoUserByID);
// GET danh sách ảnh đã lưu theo user id
userRouter.get(
  "/list-image-id/:nguoi_dung_id",
  protect,
  userController.getListImageSaveByID
);
// GET danh sách ảnh đã tạo theo user id
userRouter.get(
  "/image-create-id/:nguoi_dung_id",
  protect,
  userController.getListImageCreatedByUser
);
// DELETE ảnh đã tạo theo id ảnh
userRouter.delete(
  "/delete-image/:hinh_id",
  protect,
  userController.deleteImageById
);
// POST thêm một ảnh của user
userRouter.post(
  "/post-photo/:nguoi_dung_id",
  protect,
  userController.postPhotoForUser
);
// PUT thông tin cá nhân của user
userRouter.put("/put-info/:nguoi_dung_id", protect, userController.putInfoUser);
export default userRouter;
