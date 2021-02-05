import { validationResult } from "express-validator";
import redisService from '../stuff/redis'
import categoryService from "../services/category/categoryService";

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
    //Пробуем брать данные из редиса
    let categories = JSON.parse(await redisService.aget(`categories_${req.appid}`));
    //Если в редисе нет то берем из БД и кладем в редис
    if (!categories) {
      categories = await categoryService.getCategoriesByAppId(req.appid);
      await redisService.aset(`categories_${req.appid}`, JSON.stringify(categories));
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


export { getCategoriesByAppId };
