import express from 'express';
import todoModel from '../backend/models/Todo.js';

const router = express.Router();

// Create a new to-do item
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTodo = await todoModel.create({ title, description });
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error creating to-do item', error: error.message });
    }
});

// Get all to-do items
router.get('/', async (req, res) => {
    try {
        const todos = await todoModel.getAll();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching to-do items', error: error.message });
    }
});

// Get a specific to-do item by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await todoModel.getById(id);
        if (!todo) {
            return res.status(404).json({ message: 'To-do item not found' });
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching to-do item', error: error.message });
    }
});

// Update a to-do item by ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const updatedTodo = await todoModel.update(id, { title, description });
        if (!updatedTodo) {
            return res.status(404).json({ message: 'To-do item not found' });
        }
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error updating to-do item', error: error.message });
    }
});

// Mark a to-do item as completed
router.put('/:id/complete', async (req, res) => {
    const { id } = req.params;
    try {
        const completedTodo = await todoModel.complete(id);
        if (!completedTodo) {
            return res.status(404).json({ message: 'To-do item not found' });
        }
        res.status(200).json(completedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Error completing to-do item', error: error.message });
    }
});

// Delete a to-do item by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTodo = await todoModel.delete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: 'To-do item not found' });
        }
        res.status(200).json({ message: 'To-do item deleted', todo: deletedTodo });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting to-do item', error: error.message });
    }
});

export default router;
