import { responseSuccess } from "../common/helpers/response.helper.js";
import imageService from "../services/image.service.js";

const imageController = {
  listImage: async (req, res, next) => {
    try {
      const result = await imageService.listImage(req);

      const resData = responseSuccess(result, "Lấy danh sách ảnh thành công");

      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  ImageByName: async (req, res, next) => {
    try {
      const { ten_hinh } = req.params; // Lấy tham số `ten_hinh` từ URL params

      if (!ten_hinh) {
        return res.status(400).json({
          message: "Tên hình không được cung cấp",
          code: 400,
        });
      }

      // Gọi service để tìm ảnh theo tên
      const result = await imageService.ImageByName(ten_hinh);

      if (!result) {
        return res.status(404).json({
          message: `Không tìm thấy hình ảnh với tên: ${ten_hinh}`,
          code: 404,
        });
      }

      const resData = responseSuccess(
        result,
        "Lấy hình ảnh theo tên thành công"
      );

      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  ImageWithUser: async (req, res, next) => {
    try {
      const { hinh_id } = req.params; // Lấy tham số `hinh_id` từ URL params

      if (!hinh_id) {
        return res.status(400).json({
          message: "ID ảnh không được cung cấp",
          code: 400,
        });
      }

      // Gọi service để tìm ảnh theo id ảnh
      const result = await imageService.ImageWithUser(hinh_id);

      if (!result) {
        return res.status(404).json({
          message: `Không tìm thấy hình ảnh với ID: ${hinh_id}`,
          code: 404,
        });
      }

      const resData = responseSuccess(
        result,
        "Lấy hình ảnh và thông tin người tạo thành công"
      );

      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};

export default imageController;
