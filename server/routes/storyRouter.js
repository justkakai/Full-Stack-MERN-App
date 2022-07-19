import { Router } from 'express';

import { auth } from '../middlewares/verifyToken.js';
import { getStories, addStory, editStory, removeStory, likeStory } from '../controllers/storyControllers.js';

const router = Router();

router.get('/getstories', auth, getStories);
router.post('/addstory', auth, addStory);
router.put('/editstory/:id', auth, editStory);
router.delete('/removestory/:id', auth, removeStory);
router.put('/likestory/:id', auth, likeStory);

export default router;