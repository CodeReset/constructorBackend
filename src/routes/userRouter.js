import Router from 'express';

import { signUpSchema, signInSchema } from '../services/user/validationSchemas';
import { checkAppId, checkAuth } from '../middlewares';
import { signin, signup, getProfile, addToWishList } from '../controllers/userController';

const router = new Router();

router.post('/profile', checkAppId, checkAuth, getProfile);
router.post('/wishlist', checkAppId, checkAuth, addToWishList);
router.post('/signin', signInSchema, checkAppId, signin);
router.post('/signup', signUpSchema, checkAppId, signup);

export default router;
