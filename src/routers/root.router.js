import express from "express";
import authRouter from "./auth.router.js";
import imageRouter from "./image.rouster.js";
import commentRouter from "./comment.router.js";
import userRouter from "./user.router.js";

const rootRouter = express.Router();
// Register,Login
rootRouter.use("/auth", authRouter);
// Image
rootRouter.use("/image", imageRouter);
// Comment
rootRouter.use("/comment", commentRouter);
// User,Image,Save Detail by ID
rootRouter.use("/user", userRouter);

export default rootRouter;
