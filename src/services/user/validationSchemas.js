import { check } from "express-validator";

export const signUpSchema = [
  check("email").isEmail(),
  check("password").isLength({ max: 16, min: 6 }),
  check("name").isLength({ min: 3, max: 25 }),
];

export const signInSchema = [
  check("email").isEmail(),
  check("password").isLength({ max: 16, min: 6 }),
];
