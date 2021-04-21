import { validationResult } from 'express-validator';
import redisService from '../stuff/redis';
import ordertService from '../services/order/ordertService';
import productService from '../services/product/productService';

const createOrder = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    const { userId, products } = req.body;
    //Создаем массив с айдишниками товаров
    const productIds = [];
    products.forEach((product) => {
      productIds.push(product.id);
    });
    //Получаем список товаров с полным их описанием
    const fullProductsList = await productService.getProductsByIds(req.appid, productIds);
    //Добавляем к каждому объекту товара еще и поле count для подсчета общей цены
    fullProductsList.forEach((product) => {
      products.forEach((oldProduct) => {
        if (oldProduct.id === product.id)
          Object.assign(product.dataValues, { count: oldProduct.count });
      });
    });
    const data = await ordertService.createOrder(req.appid, userId, fullProductsList);
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

const changeOrderStatus = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    const { id, status } = req.body;
    const data = await ordertService.changeStatusById(id, status);
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

const getOrders = async (req, res) => {
  try {
    // ВАЛИДАЦИЯ
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Пожалуйста исправьте все ошибки'
      });
    }
    const data = await ordertService.getOrdersByAppId(req.appid);
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

export { createOrder, changeOrderStatus, getOrders };
