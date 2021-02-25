import Router from 'express';

import { signUpSchema, signInSchema } from '../services/user/validationSchemas';
import { checkAppId, checkAuth, checkUserType } from '../middlewares';
import { signin, signup, getProfile, addToWishList } from '../controllers/userController';

const router = new Router();

router.post('/profile', checkAppId, checkAuth, checkUserType, getProfile);
router.post('/wishlist', checkAppId, checkAuth, checkUserType, addToWishList);
router.post('/signin', signInSchema, checkAppId, checkUserType, signin);
router.post('/signup', signUpSchema, checkAppId, checkUserType, signup);

export default router;
