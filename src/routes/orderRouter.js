import Router from 'express';

import { createOrder, changeOrderStatus, getOrders } from '../controllers/orderController';
import { checkAppId, checkAuth, checkAdmin, checkAdminRules } from '../middlewares';

const router = new Router();

router.post('/create', checkAppId, checkAuth, createOrder);
router.post('/changeStatus', checkAppId, checkAdmin, checkAuth, checkAdminRules, changeOrderStatus);
router.get('/orders', checkAppId, checkAdmin, checkAuth, checkAdminRules, getOrders);

export default router;
