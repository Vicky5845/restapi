import express from 'express';
import { login, register ,registerAdmin } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register',register);
router.post('/registerAdmin',registerAdmin);
router.post('/login',login);

export default router