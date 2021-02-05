import Router from "express";

import checkAppId from "../middlewares/checkAppId";
import { getCategoriesByAppId } from "../controllers/categoryController";

const router = new Router();

router.post("/getCategoriesByAppId", checkAppId, getCategoriesByAppId);

export default router;
