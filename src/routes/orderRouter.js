import Router from "express";

import { createOrder } from "../controllers/orderController";
import { checkAppId, checkAuth } from '../middlewares';

const router = new Router();

router.post("/createOrder", checkAppId, checkAuth, createOrder);

export default router;
