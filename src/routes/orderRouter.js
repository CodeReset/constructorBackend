import Router from "express";

import { createOrder, changeOrderStatus } from "../controllers/orderController";
import { checkAppId, checkAuth, checkAdmin, checkAdminRules } from '../middlewares';

const router = new Router();

router.post("/create", checkAppId, checkAuth, createOrder);
router.post("/changeStatus", checkAppId, checkAdmin, checkAuth, checkAdminRules, changeOrderStatus);

export default router;
