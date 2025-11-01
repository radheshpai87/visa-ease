import express from 'express';
import { getApplicantStats, getMyApplications } from '../controllers/applicantController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/statistics')
  .get(protect, authorize('applicant'), getApplicantStats);

router.route('/applications')
  .get(protect, authorize('applicant'), getMyApplications);

export default router;
