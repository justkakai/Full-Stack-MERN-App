import { Router } from 'express';

import { auth } from '../middlewares/verifyToken.js';
import { getPosts, addPost, editPost, removePost } from '../controllers/postMessageControllers.js';

const router = Router();

router.get('/getposts', auth, getPosts);
router.post('/addpost', auth, addPost);
router.put('/editpost', auth, editPost);
router.delete('/removepost', auth, removePost);


export default router;