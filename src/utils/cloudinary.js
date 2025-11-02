/**
 * Transform Cloudinary URL to enable inline viewing for PDFs
 * Adds fl_attachment:false flag to prevent forced download
 * @param {string} url - Original Cloudinary URL
 * @returns {string} - Transformed URL for inline viewing
 */
export const getInlineViewUrl = (url) => {
  if (!url) return url;
  
  // Check if it's a Cloudinary URL
  if (!url.includes('cloudinary.com')) {
    return url;
  }
  
  // Check if URL already has flags
  if (url.includes('fl_attachment')) {
    return url;
  }
  
  // For PDFs (raw resource type), add inline viewing flag
  // Format: https://res.cloudinary.com/.../raw/upload/v.../file.pdf
  // Becomes: https://res.cloudinary.com/.../raw/upload/fl_attachment:false/v.../file.pdf
  
  if (url.includes('/raw/upload/')) {
    return url.replace('/raw/upload/', '/raw/upload/fl_attachment:false/');
  }
  
  // For images, no transformation needed (they display inline by default)
  return url;
};

/**
 * Check if a URL is a PDF
 * @param {string} url - File URL
 * @returns {boolean} - True if URL points to a PDF
 */
export const isPDF = (url) => {
  if (!url) return false;
  return url.toLowerCase().endsWith('.pdf') || url.includes('.pdf');
};

/**
 * Get file type from URL
 * @param {string} url - File URL
 * @returns {string} - File type (pdf, image, or unknown)
 */
export const getFileType = (url) => {
  if (!url) return 'unknown';
  
  const lowerUrl = url.toLowerCase();
  
  if (lowerUrl.endsWith('.pdf') || lowerUrl.includes('.pdf')) {
    return 'pdf';
  }
  
  if (lowerUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
    return 'image';
  }
  
  return 'unknown';
};
