import express from 'express';
import * as taskController from '../controllers/taskControllerDemo.js';

const router = express.Router();

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.get('/filter', taskController.filterTasks);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

export default router;
