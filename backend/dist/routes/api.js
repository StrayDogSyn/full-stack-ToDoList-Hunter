import express from 'express';
import taskRoutes from './taskRoutes';
const router = express.Router();
// Health check endpoint
router.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
// API routes
router.use('/tasks', taskRoutes);
export default router;
//# sourceMappingURL=api.js.map