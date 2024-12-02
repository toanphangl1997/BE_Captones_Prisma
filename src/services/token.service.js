import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRES,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES,
  REFRESH_TOKEN_SECRET,
} from "../common/constant/app.constant.js";

const tokenService = {
  createTokens: (user) => {
    const accessToken = jwt.sign(
      { nguoi_dung_id: user.nguoi_dung_id },
      ACCESS_TOKEN_SECRET,
      {
        expiresIn: ACCESS_TOKEN_EXPIRES,
      }
    );
    const refreshToken = jwt.sign(
      {
        nguoi_dung_id: user.nguoi_dung_id,
      },
      REFRESH_TOKEN_SECRET,
      {
        expiresIn: REFRESH_TOKEN_EXPIRES,
      }
    );
    return { accessToken, refreshToken };
  },
};
export default tokenService;
