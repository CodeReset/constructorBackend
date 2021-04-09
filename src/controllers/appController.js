import { validationResult } from 'express-validator';
import redisService from '../stuff/redis';
import appService from '../services/application/applicationService';
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
    const { userId, name, description, templateId, themeId } = req.body;
    //Создаем приложение в БД
    const application = await appService.createApplication(name, description, templateId, themeId);
    //Добавляем appId в опции пользователя
    await userService.addAppToUser(application.id, userId);
    return res.status(200).json({
      data: application
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

const updateStructure = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    const { appId, data } = req.body;
    await redisService.aset(appId, JSON.stringify(data));
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: e
    });
  }
};

const getApps = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    const { ids } = req.body;
    const data = await appService.getAppsByIds(ids);
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

const getPages = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    } 
    const { appId, templateId } = req.body;
    let data = JSON.parse(await redisService.aget(appId)) ;
    if(!data) {
      data = await appService.getAppPages(templateId);
    }
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

const getComponent = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    const { appId, templateId, name, page } = req.body;
    const data = await appService.getAppComponent(templateId, name, page);
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

const build = async (req, res) => {
  return;
};

export {
  createApp,
  getTemlates,
  getThemes,
  updateStructure,
  getApps,
  build,
  getPages,
  getComponent
};
