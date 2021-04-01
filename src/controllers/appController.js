import { validationResult } from 'express-validator';
import redisService from '../stuff/redis';
import appService from '../services/order/ordertService';
import userService from '../services/user/userService';

const createApp = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    const { userId, name, description, template, theme } = req.body;
    //Создаем приложение в БД
    const application = await appService.createApplication(name, description, template, theme);
    //Добавляем appId в опции пользователя
    const data = await userService.addAppToUser(application.id, userId);
    return res.status(200).json({
      data
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: e
    });
  }
};

const getTemlates = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    const { type } = req.body;
    const data = await appService.getTemlatesByAppType(type);
    return res.status(200).json({
      data
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: e
    });
  }
};

const getThemes = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    const { temlate } = req.body;
    const data = await appService.getThemesByTemlate(temlate);
    return res.status(200).json({
      data
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: e
    });
  }
};

export { createApp, getTemlates, getThemes };
