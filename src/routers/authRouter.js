import { Router } from 'express';
import authController from '../controllers/authController.js';

const router = new Router();

// Registration
router.post('/registration', authController.registration);

// Login
router.post('/login', authController.login);

export default router;