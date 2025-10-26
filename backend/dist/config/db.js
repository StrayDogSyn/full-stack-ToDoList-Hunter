import mongoose from 'mongoose';
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        }
        else {
            console.error('An unknown error occurred while connecting to MongoDB');
        }
        process.exit(1);
    }
};
export const closeDB = async () => {
    try {
        await mongoose.connection.close();
        console.log('MongoDB connection closed');
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(`Error closing MongoDB connection: ${error.message}`);
        }
        else {
            console.error('An unknown error occurred while closing MongoDB connection');
        }
    }
};
//# sourceMappingURL=db.js.map