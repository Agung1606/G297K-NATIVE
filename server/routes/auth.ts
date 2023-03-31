import express from 'express';
const router = express.Router();

import { register, login } from '../controllers/auth';

// register
router.route('/register').post(register);
// login
router.route('/login').post(login);

export default router;