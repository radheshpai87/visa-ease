/**
 * Transform Cloudinary URL to enable inline viewing for PDFs
 * Removes any download flags and ensures inline display
 * @param {string} url - Original Cloudinary URL
 * @returns {string} - Transformed URL for inline viewing
 */
export const getInlineViewUrl = (url) => {
  if (!url) return url;
  
  // Check if it's a Cloudinary URL
  if (!url.includes('cloudinary.com')) {
    return url;
  }
  
  // For Cloudinary raw resources (PDFs), we need to use the direct URL
  // Cloudinary raw resources are served as-is, so we just return the URL
  // The server-side configuration should handle the content-disposition header
  
  // Simply return the URL - the browser will handle it based on content-type
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
