import express from 'express';
import http from 'http';

const app = express();

// Create an array of possible ports to try
const possiblePorts = [5000, 5001, 5002, 5003];

const tryPort = (ports) => {
  if (ports.length === 0) {
    console.error('No available ports found!');
    process.exit(1); // Exit if no port is available
  }

  const port = ports[0];
  
  // Try to start the server on the current port
  const server = http.createServer(app);
  
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  }).on('error', (err) => {
    console.log(`Port ${port} is occupied, trying next port...`);
    tryPort(ports.slice(1)); // Try the next port
  });
};

tryPort(possiblePorts);
