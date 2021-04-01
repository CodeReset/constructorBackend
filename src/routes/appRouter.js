import Router from 'express';

import { createApp, getTemlates, getThemes, build } from '../controllers/orderController';
import { checkAppId, checkAuth, checkAdmin, checkAdminRules } from '../middlewares';

const router = new Router();

router.post('/create', checkAdmin, checkAuth, createApp);
router.post('/getTemlates', checkAdmin, checkAuth, getTemlates);
router.post('/getThemes', checkAdmin, checkAuth, getThemes);
router.post('/build', checkAdmin, checkAuth, build);
// router.post('/changeStatus', checkAppId, checkAdmin, checkAuth, checkAdminRules, changeOrderStatus);
// router.get('/orders', checkAppId, checkAdmin, checkAuth, checkAdminRules, getOrders);

export default router;
