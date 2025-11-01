import express from 'express';
import { getUsers, updateUser, deleteUser, getStatistics, getAuditLogs } from '../controllers/adminController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/users')
  .get(protect, authorize('admin'), getUsers);

router.route('/users/:id')
  .put(protect, authorize('admin'), updateUser)
  .delete(protect, authorize('admin'), deleteUser);

router.route('/statistics')
  .get(protect, authorize('admin'), getStatistics);

router.route('/audit-logs')
  .get(protect, authorize('admin'), getAuditLogs);

export default router;
