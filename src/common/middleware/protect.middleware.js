import jwt from "jsonwebtoken";
import { ForbiddenError, UnauthorizedError } from "../helpers/error.helper.js";
import prisma from "../prisma/init.prisma.js";
import { ACCESS_TOKEN_SECRET } from "../constant/app.constant.js";

const protect = async (req, res, next) => {
  try {
    console.log("Kiểm tra token");
    const accessToken = req.headers?.authorization?.split(" ")[1];
    if (!accessToken)
      throw new UnauthorizedError("Vui lòng cung cấp token để sử dụng API này");
    console.log(accessToken);

    const decodeToken = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
    console.log({ decodeToken });

    const user = await prisma.nguoi_dung.findUnique({
      where: {
        nguoi_dung_id: decodeToken.nguoi_dung_id,
      },
      select: {
        nguoi_dung_id: true,
        ho_ten: true,
        ho_ten: true,
        tuoi: true,
      },
    });
    if (!user) throw new ForbiddenError();
    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

export default protect;
