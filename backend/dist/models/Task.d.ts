import mongoose, { Document } from 'mongoose';
import { Task } from '../types/task';
export interface TaskDocument extends Task, Document {
}
declare const TaskModel: mongoose.Model<TaskDocument, {}, {}, {}, mongoose.Document<unknown, {}, TaskDocument> & TaskDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default TaskModel;
