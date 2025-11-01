import express from 'express';
import { createReview, getReviewsByApplication } from '../controllers/reviewController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

// Create a review
router.route('/')
  .post(protect, authorize('officer'), createReview)
  .get(protect, getReviewsByApplication); // Get reviews by application_id query param

export default router;
