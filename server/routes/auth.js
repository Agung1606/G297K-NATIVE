import express from 'express';
import { register, login } from '../controllers/auth.js';

const router = express.Router();

// register
router.route('/register').post(register);
// login
router.route('/login').post(login);

export default router;