import express from 'express';
import taskRoutes from './taskRoutes';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
router.use('/tasks', taskRoutes);

export default router; 