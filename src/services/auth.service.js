import { BadRequestError } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";
import tokenService from "./token.service.js";

const authService = {
  register: async (req) => {
    const { email, mat_khau } = req.body;
    console.log({ email, mat_khau });

    const userExist = await prisma.nguoi_dung.findFirst({
      where: {
        email: email,
      },
    });
    // Nếu user tồn tại thì trả lỗi
    if (userExist)
      throw new BadRequestError("Email đã tồn tại,vui lòng đăng nhập");
    const hashPassword = bcrypt.hashSync(mat_khau, 10);
    // Nếu chưa có thì tạo mới
    const userNew = await prisma.nguoi_dung.create({
      data: {
        email: email,
        mat_khau: hashPassword,
      },
    });
    return userNew;
  },

  login: async (req) => {
    const { email, mat_khau } = req.body;
    console.log(email, mat_khau);
    const userExists = await prisma.nguoi_dung.findFirst({
      where: {
        email: email,
      },
      select: {
        nguoi_dung_id: true,
        mat_khau: true,
      },
    });

    if (!userExists)
      throw new BadRequestError("Email không tồn tại vui lòng đăng ký");
    console.log({ userExists });
    // Kiểm trả password
    const passHash = userExists.mat_khau;
    const isPassword = bcrypt.compareSync(mat_khau, passHash);
    if (!isPassword) throw new BadRequestError("Mật khẩu không chính xác");
    const tokens = tokenService.createTokens(userExists);
    return tokens;
  },
};

export default authService;
