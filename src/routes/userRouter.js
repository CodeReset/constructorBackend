import Router from "express";

import {
  signUpSchema,
  signInSchema,
} from "../services/user/validationSchemas.js";
import applicationapi from "../middlewares/applicationapi.js";
import { signin, signup } from "../controllers/userController.js";

const router = new Router();

router.post("/signin", signInSchema, applicationapi, signin);
router.post("/signup", signUpSchema, applicationapi, signup);

export default router;
