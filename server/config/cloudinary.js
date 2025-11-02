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
    
    // For PDFs (raw resources), include the extension in the public_id
    const publicId = mimeType === 'application/pdf' 
      ? `doc-${originalName}-${timestamp}.pdf`
      : `doc-${originalName}-${timestamp}`;
    
    const params = {
      folder: 'visa_documents',
      public_id: publicId,
      resource_type: resourceType,
      allowed_formats: ['pdf', 'jpg', 'jpeg', 'png'],
    };
    
    // Only add format for images, not for raw resources (PDFs)
    if (resourceType === 'image') {
      params.format = format;
    }
    
    console.log('Cloudinary upload - Public ID:', publicId);
    
    return params;
  },
});

// Helper function to get URL for inline viewing
export const getInlineUrl = (cloudinaryUrl) => {
  if (!cloudinaryUrl || !cloudinaryUrl.includes('cloudinary.com')) {
    return cloudinaryUrl;
  }
  
  // For raw resources (PDFs), Cloudinary doesn't support fl_attachment transformation
  // Instead, we need to use the URL as-is and let the browser handle it
  // The browser will display PDFs inline based on the Content-Type header
  return cloudinaryUrl;
};

export default cloudinary;
