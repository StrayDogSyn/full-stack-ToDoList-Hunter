import express from 'express';
import todoModel from '../models/Todo.js'; // Import TodoModel from the correct relative path

const router = express.Router();

// Create a new to-do item
router.post('/todos', async (req, res) => {
    try {
        const { title, description } = req.body; // Get data from request body
        const newTodo = await todoModel.create({ title, description });
        res.status(201).json(newTodo); // Respond with the created to-do item
    } catch (error) {
        res.status(500).json({ message: 'Error creating to-do item', error: error.message });
    }
});

// Get all to-do items
router.get('/todos', async (req, res) => {
    try {
        const todos = await todoModel.getAll();
        res.status(200).json(todos); // Respond with all to-do items
    } catch (error) {
        res.status(500).json({ message: 'Error fetching to-do items', error: error.message });
    }
});

// Get a specific to-do item by ID
router.get('/todos/:id', async (req, res) => {
    const { id } = req.params; // Get the ID from the route parameter
    try {
        const todo = await todoModel.getById(id);
        if (!todo) {
            return res.status(404).json({ message: 'To-do item not found' });
        }
        res.status(200).json(todo); // Respond with the found to-do item
    } catch (error) {
        res.status(500).json({ message: 'Error fetching to-do item', error: error.message });
    }
});

// Update a to-do item by ID
router.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body; // Get data from request body
    try {
        const updatedTodo = await todoModel.update(id, { title, description });
        if (!updatedTodo) {
            return res.status(404).json({ message: 'To-do item not found' });
        }
        res.status(200).json(updatedTodo); // Respond with the updated to-do item
    } catch (error) {
        res.status(500).json({ message: 'Error updating to-do item', error: error.message });
    }
});

// Mark a to-do item as completed
router.put('/todos/:id/complete', async (req, res) => {
    const { id } = req.params;
    try {
        const completedTodo = await todoModel.complete(id);
        if (!completedTodo) {
            return res.status(404).json({ message: 'To-do item not found' });
        }
        res.status(200).json(completedTodo); // Respond with the completed to-do item
    } catch (error) {
        res.status(500).json({ message: 'Error completing to-do item', error: error.message });
    }
});

// Delete a to-do item by ID
router.delete('/todos/:id', async (req, res) => {
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
