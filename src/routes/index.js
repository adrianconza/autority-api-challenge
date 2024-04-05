import { Router } from 'express';

import * as homeController from '@/controllers/home';
import * as taskController from '@/controllers/task';

const router = Router();

router.get('/', homeController.index);

router.get('/health', homeController.healthCheck);

// Todos routes
router.get('/tasks', taskController.findAll);
router.get('/task/:id', taskController.findOne);
router.post('/task', taskController.create);
router.put('/task/:id', taskController.update);
router.delete('/task/:id', taskController.deleteTask);

export default router;
