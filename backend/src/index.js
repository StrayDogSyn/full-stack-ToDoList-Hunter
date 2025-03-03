import express from 'express';
import taskRoutes from './routes/taskRoutes.js'; // Ensure the path is correct

const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // Parse incoming JSON requests

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Use taskRoutes for handling '/tasks' routes
app.use('/tasks', taskRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
