import express from 'express';
const router = express.Router();

import { getExplorePosts } from '../controllers/post.js';

// get
router.route('/explore').get(getExplorePosts);

export default router;