// backend/src/models/Task.js
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  description: { 
    type: String,
    trim: true
  },
  priority: { 
    type: String, 
    required: true,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  category: {
    type: String,
    required: true,
    enum: ['personal', 'work', 'shopping', 'other'],
    default: 'personal'
  },
  dueDate: {
    type: Date
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add index for better query performance
taskSchema.index({ category: 1, priority: 1 });

const Task = mongoose.model('Task', taskSchema);

export default Task;
