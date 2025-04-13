const express = require('express');
const { 
  getAllTasks, 
  createTask, 
  updateTask, 
  deleteTask, 
  filterTasks 
} = require('../controllers/taskController');

const router = express.Router();

// Task routes
router.get('/', getAllTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.get('/filter', filterTasks);

module.exports = router;