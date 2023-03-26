import express from 'express';
const router = express.Router();

import { getExplorePosts, likePost } from '../controllers/post.js';

// get
router.route('/explore').get(getExplorePosts);

// patch
router.route('/like/:postId').patch(likePost);

export default router;