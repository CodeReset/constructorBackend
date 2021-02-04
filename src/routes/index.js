import Router from "express";

import userRouter from "./userRouter.js";

const router = new Router();

router.use("/auth", userRouter);

export default router;
