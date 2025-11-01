import express from 'express';
import multer from 'multer';
import { register, registerAdmin, login, verifyToken, getMe, updateProfile, changePassword, uploadProfilePicture } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { storage } from '../config/cloudinary.js';

const router = express.Router();
const upload = multer({ storage });

router.post('/register', register);
router.post('/admin-register', registerAdmin); // Separate admin registration endpoint
router.post('/login', login);
router.get('/verify', authMiddleware, verifyToken);
router.get('/me', authMiddleware, getMe);
router.put('/update-profile', authMiddleware, updateProfile);
router.put('/change-password', authMiddleware, changePassword);
router.post('/upload-profile-picture', authMiddleware, upload.single('profilePicture'), uploadProfilePicture);

export default router;