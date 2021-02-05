import Router from "express";

import checkAppId from "../middlewares/checkAppId";
import { getProductsByAppId } from "../controllers/productController";

const router = new Router();

router.post("/getProductsByAppId", checkAppId, getProductsByAppId);

export default router;
