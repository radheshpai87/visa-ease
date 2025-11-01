import express from 'express';
import multer from 'multer';
import { uploadDocument, getDocumentsByApplication, deleteDocument } from '../controllers/documentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { storage } from '../config/cloudinary.js';

const router = express.Router();
const upload = multer({ storage });

router.route('/upload')
  .post(protect, authorize('applicant'), upload.single('document'), uploadDocument);

router.route('/:applicationId')
  .get(protect, getDocumentsByApplication);

router.route('/delete/:id')
  .delete(protect, authorize('applicant', 'admin'), deleteDocument);

export default router;
