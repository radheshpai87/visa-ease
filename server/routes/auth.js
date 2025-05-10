import express from 'express';
import { register, login, getUserProfile, forgotPassword, resetPassword, resetPasswordDirect } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/reset-password-direct', resetPasswordDirect);

// Protected routes
router.get('/profile', authMiddleware, getUserProfile);

export default router;
