import Document from '../models/Document.js';

// @desc    Upload a document for an application
// @route   POST /api/documents/upload
// @access  Private (Applicant)
export const uploadDocument = async (req, res) => {
  try {
    const { application_id, document_type } = req.body;

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

    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).json({ message: 'Please upload a file' });
    }

    if (!application_id) {
      console.error('No application ID provided');
      return res.status(400).json({ message: 'Application ID is required' });
    }

    const newDocument = new Document({
      application_id,
      document_type: document_type || 'general',
      file_path: req.file.path, // URL from Cloudinary
    });

    const savedDocument = await newDocument.save();
    
    console.log('✅ Document saved successfully:', savedDocument._id);
    console.log('================================\n');

    res.status(201).json(savedDocument);
  } catch (error) {
    console.error('❌ Error uploading document:', error);
    console.error('Error stack:', error.stack);
    res.status(500).json({ 
      message: 'Server error during file upload', 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// @desc    Get all documents for an application
// @route   GET /api/documents/:applicationId
// @access  Private
export const getDocumentsByApplication = async (req, res) => {
  try {
    const documents = await Document.find({ application_id: req.params.applicationId });
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a document
// @route   DELETE /api/documents/delete/:id
// @access  Private (Applicant, Admin)
export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    await Document.deleteOne({ _id: document._id });
    res.status(200).json({ message: 'Document removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
