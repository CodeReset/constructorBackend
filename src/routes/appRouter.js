import Router from 'express';

import {
  createApp,
  getTemlates,
  getThemes,
  build,
  updateStructure,
  getStructure,
  getApps
} from '../controllers/appController';
import { checkAppId, checkAuth, checkAdmin, checkAdminRules } from '../middlewares';

const router = new Router();

router.post('/create', checkAdmin, checkAuth, createApp);
router.post('/getTemlates', checkAdmin, checkAuth, getTemlates);
router.post('/getThemes', checkAdmin, checkAuth, getThemes);
router.post('/build', checkAdmin, checkAuth, checkAdminRules, build);
router.post('/updateStructure', checkAdmin, checkAuth, checkAdminRules, updateStructure);
router.post('/getStructure', checkAdmin, checkAuth, checkAdminRules, getStructure);
router.post('/getApps', checkAdmin, checkAuth, checkAdminRules, getApps);

export default router;
