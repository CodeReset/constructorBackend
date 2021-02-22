import { validationResult } from "express-validator";
import redisService from '../stuff/redis'
import productService from "../services/product/productService";

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
    //Пробуем брать данные из редиса
    let products = JSON.parse(await redisService.aget(`products_${req.appid}`));
    //Если в редисе нет то берем из БД и кладем в редис
    if (!products) {
      products = await productService.getProductsByAppId(req.appid);
      await redisService.aset(`products_${req.appid}`, JSON.stringify(products));
    }

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


export { getProductsByAppId, getProductsByIds };
