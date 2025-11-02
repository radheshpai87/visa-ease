import express from 'express';
import multer from 'multer';
import { uploadDocument, getDocumentsByApplication, viewDocument, deleteDocument, verifyDocument } from '../controllers/documentController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { storage } from '../config/cloudinary.js';

const router = express.Router();

// Multer configuration with file filtering and size limits
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    console.log('Multer fileFilter - Received file:', file.originalname);
    console.log('Multer fileFilter - Mimetype:', file.mimetype);
    
    // Allow PDFs and images
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      console.log('Multer fileFilter - File accepted');
      cb(null, true);
    } else {
      console.log('Multer fileFilter - File rejected');
      cb(new Error(`Invalid file type. Only PDF, JPG, PNG files are allowed. Received: ${file.mimetype}`), false);
    }
  }
});

// Error handling middleware for multer errors
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('Multer error:', err);
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        message: 'File too large. Maximum size is 10MB.',
        error: err.message 
      });
    }
    return res.status(400).json({ 
      message: 'File upload error',
      error: err.message 
    });
  } else if (err) {
    console.error('Upload error:', err);
    return res.status(400).json({ 
      message: err.message || 'An error occurred during file upload',
      error: err.message 
    });
  }
  next();
};

router.route('/upload')
  .post(protect, authorize('applicant'), upload.single('document'), handleMulterError, uploadDocument);

router.route('/view/:id')
  .get(protect, viewDocument);

router.route('/delete/:id')
  .delete(protect, authorize('applicant', 'admin'), deleteDocument);

router.route('/verify/:id')
  .patch(protect, authorize('officer', 'admin'), verifyDocument);

router.route('/:applicationId')
  .get(protect, getDocumentsByApplication);

export default router;
