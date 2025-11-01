import express from 'express';
import { getAssignedApplications, getOfficerStats } from '../controllers/officerController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/applications')
  .get(protect, authorize('officer'), getAssignedApplications);

router.route('/statistics')
  .get(protect, authorize('officer'), getOfficerStats);

export default router;
