import mongoose, { Document, Schema } from 'mongoose';
import { Task, Priority, Category } from '../types/task';

export interface TaskDocument extends Task, Document {}

const taskSchema = new Schema<TaskDocument>({
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
    enum: ['low', 'medium', 'high'] as Priority[],
    default: 'medium'
  },
  category: {
    type: String,
    required: true,
    enum: ['personal', 'work', 'shopping', 'other'] as Category[],
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

const TaskModel = mongoose.model<TaskDocument>('Task', taskSchema);

export default TaskModel; 