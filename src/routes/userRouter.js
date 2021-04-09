import Router from 'express';

import { signUpSchema, signInSchema } from '../services/user/validationSchemas';
import { checkAppId, checkAuth, checkUserType } from '../middlewares';
import { signin, signup, getProfile, addToWishList } from '../controllers/userController';

const router = new Router();

router.post('/profile', checkAuth, checkUserType, getProfile);
router.post('/wishlist' , checkAuth, checkUserType, addToWishList);
router.post('/signin', signInSchema, checkUserType, checkAppId, signin);
router.post('/signup', signUpSchema, checkUserType, checkAppId, signup);

export default router;
