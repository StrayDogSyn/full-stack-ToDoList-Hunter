import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [1, 'Title cannot be empty'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Index for better query performance
taskSchema.index({ completed: 1, createdAt: -1 });
taskSchema.index({ title: 'text', description: 'text' });

// Virtual for task status
taskSchema.virtual('status').get(function() {
  if (this.completed) return 'completed';
  if (this.dueDate && this.dueDate < new Date()) return 'overdue';
  return 'pending';
});

// Method to mark task as complete
taskSchema.methods.markComplete = async function() {
  this.completed = true;
  return this.save();
};

// Method to mark task as incomplete
taskSchema.methods.markIncomplete = async function() {
  this.completed = false;
  return this.save();
};

// Static method to get all completed tasks
taskSchema.statics.getCompleted = function() {
  return this.find({ completed: true });
};

// Static method to get all incomplete tasks
taskSchema.statics.getIncomplete = function() {
  return this.find({ completed: false });
};

const Task = mongoose.model('Task', taskSchema);

export default Task;
