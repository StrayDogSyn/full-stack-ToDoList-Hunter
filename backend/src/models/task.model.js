// models/task.model.js

import mongoose from 'mongoose';

// Define the Task Schema
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // The title is required
    },
    description: {
      type: String,
      required: false, // The description is optional
    },
    completed: {
      type: Boolean,
      default: false, // Defaults to false if not provided
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the creation date to the current date
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Create and export the Task model based on the schema
const Task = mongoose.model('Task', taskSchema);

export default Task;
