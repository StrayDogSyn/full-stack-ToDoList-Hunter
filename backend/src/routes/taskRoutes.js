import express from 'express';
import { getAllTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js';

const router = express.Router();

// Routes
router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

export default router;
