import express from 'express';
import { createOrder, verifyPayment, getPaymentStatus } from '../controllers/paymentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create Razorpay order
router.post('/create-order', protect, authorize('applicant'), createOrder);

// Verify payment
router.post('/verify', protect, authorize('applicant'), verifyPayment);

// Get payment status
router.get('/status/:applicationId', protect, getPaymentStatus);

export default router;
