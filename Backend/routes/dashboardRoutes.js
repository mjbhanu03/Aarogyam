// backend/routes/dashboardRoutes.js

import express from 'express';
import { getDashboardData } from '../controllers/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import our middleware

const router = express.Router();

// This route is now protected. A user must provide a valid token.
router.route('/').get(protect, getDashboardData);

export default router;