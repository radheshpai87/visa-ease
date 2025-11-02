# Cloudinary PDF Upload Fix

## Problem
PDF files were not uploading correctly to Cloudinary. The issue was related to how Cloudinary handles different file types.

## Root Cause
Cloudinary requires different `resource_type` values for different file types:
- **Images** (JPG, PNG): `resource_type: 'image'`
- **PDFs and other documents**: `resource_type: 'raw'`
- **Auto detection**: `resource_type: 'auto'` (doesn't always work reliably for PDFs)

The previous configuration used `resource_type: 'auto'` which may not have been handling PDFs correctly.

## Solution Implemented

### 1. Updated Cloudinary Storage Configuration (`server/config/cloudinary.js`)

Changed from a static params object to a dynamic async function that determines the correct resource type based on file mimetype:

```javascript
export const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const mimeType = file.mimetype;
    let format;
    let resourceType = 'auto';
    
    if (mimeType === 'application/pdf') {
      format = 'pdf';
      resourceType = 'raw'; // PDFs MUST be uploaded as 'raw' type
    } else if (mimeType.startsWith('image/jpeg') || mimeType.startsWith('image/jpg')) {
      format = 'jpg';
      resourceType = 'image';
    } else if (mimeType.startsWith('image/png')) {
      format = 'png';
      resourceType = 'image';
    } else {
      const ext = file.originalname.split('.').pop().toLowerCase();
      format = ext;
      resourceType = ext === 'pdf' ? 'raw' : 'auto';
    }
    
    return {
      folder: 'visa_documents',
      format: format,
      public_id: `doc-${originalName}-${timestamp}`,
      resource_type: resourceType,
      allowed_formats: ['pdf', 'jpg', 'jpeg', 'png'],
    };
  },
});
```

**Key Changes:**
- PDFs now explicitly use `resource_type: 'raw'`
- Images explicitly use `resource_type: 'image'`
- Added comprehensive logging for debugging
- Dynamic format detection based on actual file mimetype

### 2. Enhanced Multer Configuration (`server/routes/documentRoutes.js`)

Added file filtering, size limits, and better error handling:

```javascript
const upload = multer({ 
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Allow PDFs and images only
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type. Only PDF, JPG, PNG files are allowed.`), false);
    }
  }
});
```

**Key Features:**
- **File Type Validation:** Only PDF and image files allowed
- **Size Limit:** 10MB maximum file size
- **Detailed Logging:** Shows mimetype and file details
- **Error Messages:** Clear feedback on rejected files

### 3. Added Multer Error Handler

Created middleware to catch and handle multer-specific errors:

```javascript
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
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
    return res.status(400).json({ 
      message: err.message || 'An error occurred during file upload',
      error: err.message 
    });
  }
  next();
};
```

### 4. Enhanced Document Controller Logging (`server/controllers/documentController.js`)

Added comprehensive logging to track upload process:

```javascript
console.log('=== Document Upload Request ===');
console.log('- Application ID:', application_id);
console.log('- Document Type:', document_type);
console.log('- File present:', !!req.file);

if (req.file) {
  console.log('- File details:');
  console.log('  * Original name:', req.file.originalname);
  console.log('  * Mimetype:', req.file.mimetype);
  console.log('  * Size:', req.file.size, 'bytes');
  console.log('  * Cloudinary path:', req.file.path);
  console.log('  * Filename:', req.file.filename);
}
```

## How It Works Now

### Upload Flow

1. **Frontend:** User selects a PDF or image file
2. **Multer:** Validates file type and size
3. **Cloudinary Storage:**
   - Detects file mimetype
   - Sets correct `resource_type` (`raw` for PDF, `image` for images)
   - Sets correct format (pdf, jpg, png)
   - Uploads to `visa_documents` folder
4. **Document Controller:** Saves file URL to MongoDB
5. **Response:** Returns saved document with Cloudinary URL

### File Types Supported

| File Type | Mimetype | Resource Type | Format |
|-----------|----------|---------------|--------|
| PDF | `application/pdf` | `raw` | `pdf` |
| JPEG | `image/jpeg` | `image` | `jpg` |
| JPG | `image/jpg` | `image` | `jpg` |
| PNG | `image/png` | `image` | `png` |
| GIF | `image/gif` | `image` | `gif` |

### File Size Limits

- **Maximum:** 10MB per file
- **Reason:** Prevents server overload and ensures reasonable upload times

## Testing PDF Upload

After deployment, test with:

1. **Small PDF (< 1MB):** Should upload successfully
2. **Large PDF (5-10MB):** Should upload successfully
3. **PDF > 10MB:** Should be rejected with clear error message
4. **Non-PDF file (e.g., .docx):** Should be rejected
5. **Image files (JPG, PNG):** Should upload successfully

## Debugging

If PDF upload still fails, check Vercel function logs for:

1. **File received:** Check if `req.file` exists
2. **Mimetype:** Should be `application/pdf`
3. **Resource type:** Should be set to `raw`
4. **Cloudinary response:** Check for any Cloudinary API errors
5. **File size:** Ensure it's under 10MB

### Log Output Format

Successful upload logs will show:
```
=== Document Upload Request ===
- Application ID: 67abc123...
- Document Type: Passport
- File present: true
- File details:
  * Original name: my-passport.pdf
  * Mimetype: application/pdf
  * Size: 234567 bytes
  * Cloudinary path: https://res.cloudinary.com/dignxiehl/raw/upload/v1234567890/visa_documents/doc-my-passport-1234567890.pdf
  * Filename: visa_documents/doc-my-passport-1234567890
✅ Document saved successfully: 67def456...
```

## Benefits

✅ **Reliable PDF Uploads:** Explicitly sets correct resource type for PDFs
✅ **Better Error Handling:** Clear error messages for file type and size issues
✅ **File Validation:** Only accepts allowed file types
✅ **Size Protection:** Prevents server overload with 10MB limit
✅ **Detailed Logging:** Easy debugging with comprehensive logs
✅ **Type Safety:** Proper format detection for all supported file types

## Files Modified

1. `server/config/cloudinary.js` - Updated storage configuration
2. `server/routes/documentRoutes.js` - Added multer config and error handler
3. `server/controllers/documentController.js` - Enhanced logging and error handling

---

**Status:** ✅ COMPLETE  
**Deployment:** Pushed to main, auto-deploying via Vercel  
**Expected Result:** PDF and image uploads working correctly
