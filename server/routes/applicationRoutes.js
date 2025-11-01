import express from 'express';
import {
  getApplications,
  createApplication,
  getApplicationById,
  updateApplication,
  deleteApplication
} from '../controllers/applicationController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(protect, authorize('admin', 'officer'), getApplications)
  .post(protect, authorize('applicant'), createApplication);

router.route('/:id')
  .get(protect, getApplicationById)
  .put(protect, authorize('admin', 'officer'), updateApplication)
  .delete(protect, authorize('admin'), deleteApplication);

export default router;
