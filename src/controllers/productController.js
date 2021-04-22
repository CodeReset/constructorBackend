import { validationResult } from 'express-validator';
import redisService from '../stuff/redis';
import uploadService from '../stuff/uploader';
import productService from '../services/product/productService';
import categoryService from '../services/category/categoryService';
import { Op } from 'sequelize';

const getProductsByAppId = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    let { status } = req.body;
    if (status === 'all') {
      status = ['active', 'hidden'];
    }
    let products;
    let ids = [];
    const categories = await categoryService.getCategoriesByAppId(req.appid, 'hidden');
    ids = categories.map((item) => {
      return item.id;
    });
    if (process.env.FRONT_DEV) {
      products = await productService.getProductsByAppId(req.appid, status, {
        id: { [Op.notIn]: ids }
      });
      return res.status(200).json({
        data: products
      });
    }
    //Пробуем брать данные из редиса
    products = JSON.parse(await redisService.aget(`products_${req.appid}`));
    await redisService.aexpire(`products_${req.appid}`, 2);
    //Если в редисе нет то берем из БД и кладем в редис
    if (products) {
      products = await productService.getProductsByAppId(req.appid, status, {
        id: { [Op.notIn]: ids }
      });
      await redisService.aset(`products_${req.appid}`, JSON.stringify(products));
      await redisService.aexpire(`products_${req.appid}`, 2);
    }
    products = await productService.getProductsByAppId(req.appid, status, {
      id: { [Op.notIn]: ids }
    });
    return res.status(200).json({
      data: products
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: e
    });
  }
};

const getProductsByIds = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    const { products_ids } = req.body;
    const products = await productService.getProductsByIds(req.appid, products_ids);

    return res.status(200).json({
      data: products
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      message: e
    });
  }
};

const addProductFromAdmin = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    const { categoryId, name, description, price, img, status } = req.body;
    const data = await productService.addProduct(
      req.appid,
      categoryId,
      name,
      description,
      price,
      img,
      status
    );

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

const deleteProductFromAdmin = async (req, res) => {
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
    const data = await productService.deleteProductById(req.appid, id);

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

const updateProductFromAdmin = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    const { id, categoryId, name, description, price, img, status } = req.body;
    const newData = { categoryId, name, description, price, img, status };
    const data = await productService.updateProductById(req.appid, id, newData);

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

const uploadProductImageFromAdmin = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    const { status, data } = await uploadService.uploadFile(req);
    res.status(status).json({
      data
    });
  } catch (e) {
    return res.status(500).json({
      message: e
    });
  }
};

const deleteProductImageFromAdmin = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    const { name } = req.body;
    await uploadService.destroyFile(`${process.cwd()}/public/${req.appid}/${name}`);
    res.status(200).json({
      data: {
        status: 'ok'
      }
    });
  } catch (e) {
    return res.status(500).json({
      message: e
    });
  }
};

export {
  getProductsByAppId,
  getProductsByIds,
  addProductFromAdmin,
  deleteProductFromAdmin,
  updateProductFromAdmin,
  uploadProductImageFromAdmin,
  deleteProductImageFromAdmin
};
