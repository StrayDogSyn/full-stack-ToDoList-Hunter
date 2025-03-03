import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';
import Task from './models/task.model.js'; // Updated path

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
// ... (rest of your code)

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/todolist', {});
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Start the server
const possiblePorts = [5000, 5001, 5002, 5003];

const tryPort = (ports) => {
  if (ports.length === 0) {
    console.error('No available ports found! Exiting...');
    process.exit(1); // Exit if no port is available
  }

  const port = ports[0];

  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }).on('error', (err) => {
    console.log(`Port ${port} is occupied, trying next port...`);
    tryPort(ports.slice(1)); // Try the next port
  });
};

tryPort(possiblePorts);
