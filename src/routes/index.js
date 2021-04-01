import Router from "express";

import userRouter from "./userRouter";
import productRouter from "./productRouter";
import categoryRouter from "./categoryRouter";
import orderRouter from "./orderRouter";
import appRouter from "./appRouter";

const router = new Router();

router.use("/user", userRouter);
router.use("/product", productRouter);
router.use("/category", categoryRouter);
router.use("/order", orderRouter);
router.use("/app", appRouter);

export default router;
