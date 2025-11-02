import express from 'express';
import { 
  getUsers, 
  createUser,
  updateUser, 
  deleteUser, 
  getStatistics, 
  getAuditLogs,
  getAllApplications,
  deleteApplication,
  getAllVisaTypes,
  createVisaType,
  updateVisaType,
  deleteVisaType,
  getAllDocuments,
  deleteDocument
} from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// User Management Routes
router.route('/users')
  .get(protect, authorize('admin'), getUsers)
  .post(protect, authorize('admin'), createUser);

router.route('/users/:id')
  .put(protect, authorize('admin'), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

// Statistics & Audit
router.route('/statistics')
  .get(protect, authorize('admin'), getStatistics);

router.route('/audit-logs')
  .get(protect, authorize('admin'), getAuditLogs);

// Application Management Routes
router.route('/applications')
  .get(protect, authorize('admin'), getAllApplications);

router.route('/applications/:id')
  .delete(protect, authorize('admin'), deleteApplication);

// Visa Type Management Routes
router.route('/visa-types')
  .get(protect, authorize('admin'), getAllVisaTypes)
  .post(protect, authorize('admin'), createVisaType);

router.route('/visa-types/:id')
  .put(protect, authorize('admin'), updateVisaType)
  .delete(protect, authorize('admin'), deleteVisaType);

// Document Management Routes
router.route('/documents')
  .get(protect, authorize('admin'), getAllDocuments);

router.route('/documents/:id')
  .delete(protect, authorize('admin'), deleteDocument);

export default router;
