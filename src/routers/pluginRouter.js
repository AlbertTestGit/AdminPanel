import { Router } from 'express';
import pluginController from '../controllers/pluginController.js';

const router = new Router();


router.post('/', pluginController.create);


export default router;