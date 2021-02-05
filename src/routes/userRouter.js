import Router from "express";

import {
  signUpSchema,
  signInSchema,
} from "../services/user/validationSchemas";
import checkAppId from "../middlewares/checkAppId";
import { signin, signup } from "../controllers/userController";

const router = new Router();

router.post("/signin", signInSchema, checkAppId, signin);
router.post("/signup", signUpSchema, checkAppId, signup);

export default router;
