import { Router } from 'express';
import userController from '../controllers/userController.js';

const router = new Router();

// Get All
router.get('/', userController.getAll);

// Get One
router.get('/:userId', userController.getOne);

// Create
router.post('/', userController.create);

// Update
router.put('/', userController.update);

// Delete
router.delete('/:userId', userController.delete);

export default router;