import { userService } from "../services/user.service.js";
import { responseSuccess } from "../common/helpers/response.helper.js";

export const userController = {
  getInfoUser: async (req, res, next) => {
    try {
      const result = await userService.getInfoUser(req);
      const resData = responseSuccess(result, "Lấy thông tin user thành công");
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  getInfoUserByID: async (req, res, next) => {
    try {
      const { nguoi_dung_id } = req.params; // url: /user/info/nguoi_dung_id
      if (!nguoi_dung_id) {
        return res.status(400).json({
          message: "Id người dùng không được cung cấp",
          code: 400,
        });
      }
      const userInfo = await userService.getInfoUserByID(nguoi_dung_id);
      if (!userInfo) {
        return res.status(404).json({
          message: ` Không tìm thấy người dùng với id: ${nguoi_dung_id}`,
          code: 404,
        });
      }

      const resData = responseSuccess(
        userInfo,
        "Lấy thông tin người dùng thành công"
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  getListImageSaveByID: async (req, res, next) => {
    try {
      const { nguoi_dung_id } = req.params;
      const images = await userService.getListImageSaveByID(nguoi_dung_id);
      res.json({
        code: 200,
        message: "Lấy tất cả ảnh đã lưu theo ID thành công",
        data: images,
      });
    } catch (error) {
      next(error);
    }
  },

  getListImageCreatedByUser: async (req, res, next) => {
    try {
      const { nguoi_dung_id } = req.params;
      if (!nguoi_dung_id) {
        return res.status(400).json({
          message: "ID người dùng không được cung cấp",
          code: 400,
        });
      }

      const images = await userService.getListImageCreatedByUser(nguoi_dung_id);
      // if (!images || images.length === 0) {
      //   return res.status(404).json({
      //     message: `Không tìm thấy ảnh đã tạo cho người dùng với ID: ${nguoi_dung_id}`,
      //     code: 404,
      //   });
      // }
      const resData = responseSuccess(
        images,
        "Lấy ảnh đã tạo theo ID thành công"
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  deleteImageById: async (req, res, next) => {
    try {
      const { hinh_id } = req.params;

      // Gọi service
      const result = await userService.deleteImageById(hinh_id);

      // Phản hồi thành công
      res.status(200).json(result);
    } catch (error) {
      // Xử lý lỗi từ service
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  postPhotoForUser: async (req, res, next) => {
    try {
      const result = await userService.postPhotoForUser(req);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  putInfoUser: async (req, res, next) => {
    try {
      const result = await userService.putInfoUser(req);
      const resData = responseSuccess(
        result,
        "Chỉnh sửa thông tin user thành công"
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};
