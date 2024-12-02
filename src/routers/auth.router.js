import express from "express";
import authController from "../controllers/auth.controller.js";

const authRouter = express.Router();

// POST trang đăng ký
authRouter.post("/register", authController.register);
// POST trang đăng nhập
authRouter.post("/login", authController.login);

export default authRouter;
