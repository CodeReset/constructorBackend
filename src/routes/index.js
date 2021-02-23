import Router from "express";

import userRouter from "./userRouter";
import productRouter from "./productRouter";
import categoryRouter from "./categoryRouter";
import orederRouter from "./orderRouter";

const router = new Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/order", orederRouter);

export default router;
