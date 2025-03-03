import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Made title required
  description: { type: String, required: true }, // Made description required
  completed: { type: Boolean, default: false }, // Added a default value for completed
}, { timestamps: true }); // Optionally add timestamps to track creation and update times

const Task = mongoose.model('Task', taskSchema);

export default Task;
