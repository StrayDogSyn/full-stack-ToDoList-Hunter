const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    index: true
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
  completed: { 
    type: Boolean, 
    default: false,
    index: true
  },
  dueDate: {
    type: Date,
    index: true
  }
}, {
  timestamps: true
});

// Add text index for search
taskSchema.index({ title: 'text', description: 'text' });

// Add compound index for common queries
taskSchema.index({ category: 1, priority: 1, completed: 1 });

const TaskModel = mongoose.model('Task', taskSchema);

module.exports = TaskModel;