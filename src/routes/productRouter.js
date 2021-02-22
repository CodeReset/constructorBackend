import Router from "express";

import { checkAppId } from '../middlewares';
import { getProductsByAppId, getProductsByIds } from "../controllers/productController";

const router = new Router();

router.post("/getProductsByAppId", checkAppId, getProductsByAppId);
router.post("/getProductsByIds", checkAppId, getProductsByIds);

export default router;
