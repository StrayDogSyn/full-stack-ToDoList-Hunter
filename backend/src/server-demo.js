import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/apiDemo.js';
import errorHandler from './middleware/errorHandler.js';
import requestLogger from './middleware/requestLogger.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Routes
app.use('/api', apiRoutes);

// Error handling
app.use(errorHandler);

// Start server without MongoDB for demo purposes
// Using in-memory storage instead
console.log('🚀 Starting server in DEMO MODE (in-memory storage)');
console.log('📝 Note: Data will not persist between restarts');

app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
  console.log(`🌐 API available at http://localhost:${port}/api`);
  console.log(`💚 Health check: http://localhost:${port}/api/health`);
});

export default app;
