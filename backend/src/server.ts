import * as express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import apiRoutes from './routes/api';
import errorHandler from './middleware/errorHandler';
import requestLogger from './middleware/requestLogger';
import { connectDB } from './config/db';

dotenv.config();

const app = express.default();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api', apiRoutes);

// Error handling
app.use(errorHandler);

// Connect to MongoDB and start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Server failed to start:', error);
    process.exit(1);
  });