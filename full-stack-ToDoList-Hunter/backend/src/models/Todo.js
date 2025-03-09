import mongoose from 'mongoose';

// Define the schema for the to-do item
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Create the model based on the schema
const Todo = mongoose.model('Todo', todoSchema);

// Define the CRUD operations (using MongoDB through Mongoose)
class TodoModel {
    // Create a new to-do item
    async create(task) {
        const newTodo = new Todo({
            title: task.title,
            description: task.description,
        });

        try {
            await newTodo.save();
            return newTodo;
        } catch (error) {
            throw new Error('Error creating to-do item: ' + error.message);
        }
    }

    // Get all to-do items
    async getAll() {
        try {
            const todos = await Todo.find();
            return todos;
        } catch (error) {
            throw new Error('Error fetching to-do items: ' + error.message);
        }
    }

    // Get a specific to-do item by ID
    async getById(id) {
        try {
            const todo = await Todo.findById(id);
            return todo;
        } catch (error) {
            throw new Error('Error fetching to-do item: ' + error.message);
        }
    }

    // Update a to-do item by ID
    async update(id, updatedTask) {
        try {
            const todo = await Todo.findByIdAndUpdate(id, updatedTask, {
                new: true, // Return the updated object
            });
            return todo;
        } catch (error) {
            throw new Error('Error updating to-do item: ' + error.message);
        }
    }

    // Mark a to-do item as completed
    async complete(id) {
        try {
            const todo = await Todo.findByIdAndUpdate(id, { completed: true }, {
                new: true,
            });
            return todo;
        } catch (error) {
            throw new Error('Error marking to-do item as completed: ' + error.message);
        }
    }

    // Delete a to-do item by ID
    async delete(id) {
        try {
            const deletedTodo = await Todo.findByIdAndDelete(id);
            return deletedTodo;
        } catch (error) {
            throw new Error('Error deleting to-do item: ' + error.message);
        }
    }
}

export default new TodoModel(); // Export an instance of the class to use in controllers
