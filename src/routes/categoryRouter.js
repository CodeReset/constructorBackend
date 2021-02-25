import Router from 'express';

import { checkAppId, checkAdmin, checkAuth, checkAdminRules } from '../middlewares';
import {
  getCategoriesByAppId,
  addCategoryFromAdmin,
  deleteCategoryFromAdmin,
  updateCategoryFromAdmin
} from '../controllers/categoryController';

const router = new Router();

router.post('/getCategoriesByAppId', checkAppId, getCategoriesByAppId);
router.post('/add', checkAppId, checkAdmin, checkAuth, checkAdminRules, addCategoryFromAdmin);
router.delete(
  '/delete',
  checkAppId,
  checkAdmin,
  checkAuth,
  checkAdminRules,
  deleteCategoryFromAdmin
);
router.patch(
  '/update',
  checkAppId,
  checkAdmin,
  checkAuth,
  checkAdminRules,
  updateCategoryFromAdmin
);

export default router;
