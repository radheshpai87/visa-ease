import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config({ path: './server/.env' });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'visa_documents',
    format: async (req, file) => {
      // Determine format based on the actual file mimetype
      const mimeType = file.mimetype;
      if (mimeType === 'application/pdf') return 'pdf';
      if (mimeType.startsWith('image/jpeg') || mimeType.startsWith('image/jpg')) return 'jpg';
      if (mimeType.startsWith('image/png')) return 'png';
      // Default to original extension if available
      const ext = file.originalname.split('.').pop();
      return ext || 'pdf';
    },
    public_id: (req, file) => {
      // Create a more descriptive filename
      const timestamp = Date.now();
      const originalName = file.originalname.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_');
      return `doc-${originalName}-${timestamp}`;
    },
    resource_type: 'auto', // Automatically detect resource type (image, raw, video, etc.)
  },
});

export default cloudinary;
