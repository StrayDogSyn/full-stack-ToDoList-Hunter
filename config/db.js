import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Set mongoose to use the new URL parser and unified topology
mongoose.set('strictQuery', false); // Optional: Resolves deprecation warning about query parsing

const connectDB = async () => {
    try {
        // Use the MONGODB_URI from the .env file
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
