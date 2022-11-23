import { Router } from 'express';
import userController from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = new Router();

// Get All
router.get('/', userController.getAll);

// Get One
router.get('/:userId', userController.getOne);

// Create
router.post('/', authMiddleware, userController.create);

// Update
router.put('/', authMiddleware, userController.update);

// Delete
router.delete('/:userId', authMiddleware, userController.delete);

export default router;