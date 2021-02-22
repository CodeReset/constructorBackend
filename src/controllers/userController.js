import { validationResult } from "express-validator";

import userService from "../services/user/userService";

const signup = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Пожалуйста исправьте все ошибки",
      });
    }
    const { email, name, password } = req.body;
    const { status, message } = await userService.signup(
      email,
      name,
      password,
      req.appid
    );
    return res.status(status).json({
      message,
    });
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Пожалуйста исправьте все ошибки",
      });
    }
    const { userId } = req.body;
    const data = await userService.getProfileById(userId);
    return res.status(200).json({
      data,
    });
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

const addToWishList = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Пожалуйста исправьте все ошибки",
      });
    }
    const { productId, userId } = req.body;
    const data = await userService.addProductToWishList(productId, userId);
    return res.status(200).json({
      data,
    });
  } catch (e) {
    console.log(e)
    return res.status(500).json({
      message: e,
    });
  }
};

const signin = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: "Пожалуйста исправьте все ошибки",
      });
    }
    const { email, password } = req.body;
    const { status, message, token = null } = await userService.signin(
      email,
      password,
      req.appid
    );
    if (token) {
      return res.status(status).json({
        message,
        token,
      });
    }
    return res.status(status).json({
      message,
    });
  } catch (e) {
    return res.status(500).json({
      message: e,
    });
  }
};

export { signup, signin, getProfile, addToWishList };
