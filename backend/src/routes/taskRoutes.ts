import * as express from 'express';
import { 
  getAllTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
  filterTasks 
} from '../controllers/taskController';

const router = express.Router();

// Task routes
router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/filter', filterTasks);

export default router;