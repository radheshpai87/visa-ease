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
  params: async (req, file) => {
    // Determine format and resource type based on the actual file mimetype
    const mimeType = file.mimetype;
    let format;
    let resourceType = 'auto';
    
    console.log('Cloudinary upload - File mimetype:', mimeType);
    console.log('Cloudinary upload - Original filename:', file.originalname);
    
    if (mimeType === 'application/pdf') {
      format = 'pdf';
      resourceType = 'raw'; // PDFs must be uploaded as 'raw' type
    } else if (mimeType.startsWith('image/jpeg') || mimeType.startsWith('image/jpg')) {
      format = 'jpg';
      resourceType = 'image';
    } else if (mimeType.startsWith('image/png')) {
      format = 'png';
      resourceType = 'image';
    } else {
      // Default to original extension if available
      const ext = file.originalname.split('.').pop().toLowerCase();
      format = ext;
      resourceType = ext === 'pdf' ? 'raw' : 'auto';
    }
    
    console.log('Cloudinary upload - Format:', format, 'Resource Type:', resourceType);
    
    // Create a more descriptive filename
    const timestamp = Date.now();
    const originalName = file.originalname.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_');
    
    return {
      folder: 'visa_documents',
      format: format,
      public_id: `doc-${originalName}-${timestamp}`,
      resource_type: resourceType,
      allowed_formats: ['pdf', 'jpg', 'jpeg', 'png'],
      // For PDFs, set flags to allow inline viewing instead of forcing download
      flags: resourceType === 'raw' ? 'attachment:false' : undefined,
    };
  },
});

export default cloudinary;
