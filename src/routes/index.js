import Router from "express";

import userRouter from "./userRouter";
import productRouter from "./productRouter";
import categoryRouter from "./categoryRouter";

const router = new Router();

router.use("/auth", userRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);

export default router;
