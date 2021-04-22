import { validationResult } from 'express-validator';
import redisService from '../stuff/redis';
import categoryService from '../services/category/categoryService';

const getCategoriesByAppId = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    let categories;
    let { status } = req.body;
    if (status === 'all') {
      status = ['active', 'hidden'];
    }
    if (process.env.FRONT_DEV) {
      categories = await categoryService.getCategoriesByAppId(req.appid, status);
      return res.status(200).json({
        data: categories
      });
    }
    //Пробуем брать данные из редиса
    categories = JSON.parse(await redisService.aget(`categories_${req.appid}`));
    await redisService.aexpire(`categories_${req.appid}`, 2);
    //Если в редисе нет то берем из БД и кладем в редис
    if (!categories) {
      categories = await categoryService.getCategoriesByAppId(req.appid, status);
      await redisService.aset(`categories_${req.appid}`, JSON.stringify(categories, status));
      await redisService.aexpire(`categories_${req.appid}`, 2);
    }
    return res.status(200).json({
      data: categories
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: e
    });
  }
};

const addCategoryFromAdmin = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    const { name, img, status } = req.body;
    const data = await categoryService.addCategory(req.appid, name, img, status);
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

const deleteCategoryFromAdmin = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    const { id } = req.body;
    const data = await categoryService.deleteCategoryById(req.appid, id);
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

const updateCategoryFromAdmin = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    const { id, name, img, status } = req.body;
    const newData = { name, img, status };
    const data = await categoryService.updateCategoryNameById(req.appid, id, newData);
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

export {
  getCategoriesByAppId,
  addCategoryFromAdmin,
  deleteCategoryFromAdmin,
  updateCategoryFromAdmin
};
