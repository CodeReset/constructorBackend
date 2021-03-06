import Router from 'express';
import multer from 'multer';

import { checkAppId, checkAdmin, checkAuth, checkAdminRules } from '../middlewares';
import {
  getProductsByAppId,
  getProductsByIds,
  addProductFromAdmin,
  deleteProductFromAdmin,
  updateProductFromAdmin,
  uploadProductImageFromAdmin,
  deleteProductImageFromAdmin
} from '../controllers/productController';

const upload = multer({ dest: 'upload' });

const router = new Router();

router.post('/getProductsByAppId', checkAppId, getProductsByAppId);
router.post('/getProductsByIds', checkAppId, getProductsByIds);
router.post('/add', checkAppId, checkAdmin, checkAuth, checkAdminRules, addProductFromAdmin);
router.post('/delete', checkAppId, checkAdmin, checkAuth, checkAdminRules, deleteProductFromAdmin);
router.patch('/update', checkAppId, checkAdmin, checkAuth, checkAdminRules, updateProductFromAdmin);

//Роуты для работы с загрузкой фотографий для продуктов
router.post(
  '/uploadImage',
  checkAppId,
  //   checkAdmin,
  //   checkAuth,
  //   checkAdminRules,
  upload.single('file'),
  uploadProductImageFromAdmin
);
router.post(
  '/deleteImage',
  checkAppId,
  checkAdmin,
  checkAuth,
  checkAdminRules,
  deleteProductImageFromAdmin
);

export default router;
