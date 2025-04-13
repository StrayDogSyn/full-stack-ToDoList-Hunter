import express from 'express';
import taskRoutes from './taskRoutes.js';

const router = express.Router();

// Health check endpoint
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Categories endpoint
router.get('/categories', (_req, res) => {
  res.json(['personal', 'work', 'shopping', 'other']);
});

// API routes
router.use('/tasks', taskRoutes);

export default router;