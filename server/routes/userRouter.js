import { Router } from 'express';

// importing the controllers
import { signup, signin } from '../controllers/userControllers.js';

const router = Router();

// define the routes

/**
 * @method POST /user/signup
 * @desc signing up, and get access token
 * @access PUblic
 */
router.post('/signup', signup);

/**
 * @method POST /user/signin
 * @desc signing in, and get access token
 * @access PUblic
 */
router.post('/signin', signin);

export default router;