import express from "express";
import rootRouter from "./src/routers/root.router.js";

const app = express();

// Sử dụng middleware chuyển JSON sang đối tượng JS (object,...)
app.use(express.json());

app.use(rootRouter);

const PORT = 3000;
app.listen(3000, () => {
  console.log(`App working at port ${PORT}`);
});
