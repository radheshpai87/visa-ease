import React, { useRef, useState } from 'react';
import axios from '../api/axios';
import { toast } from 'react-toastify';

const DocumentUpload = ({ applicationId, onUpload }) => {
  const fileInputRef = useRef();
  const [documentType, setDocumentType] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !documentType) {
      toast.error('Please select a document type and file.');
      return;
    }
    const formData = new FormData();
    formData.append('document', file);
    formData.append('application_id', applicationId);
    formData.append('document_type', documentType);
    setUploading(true);
    setProgress(0);
    try {
      await axios.post('/documents/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded * 100) / e.total));
        }
      });
      toast.success('Document uploaded!');
      setDocumentType('');
      fileInputRef.current.value = '';
      if (onUpload) onUpload();
    } catch {
      toast.error('Failed to upload document');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Upload Document</h3>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
            <select
              value={documentType}
              onChange={e => setDocumentType(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent"
            >
              <option value="">Select Document Type</option>
              <option value="Passport">Passport</option>
              <option value="Photo">Photo</option>
              <option value="Itinerary">Itinerary</option>
              <option value="I-20 Form">I-20 Form</option>
              <option value="Job Offer Letter">Job Offer Letter</option>
              <option value="Financial Documents">Financial Documents</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select File</label>
            <input
              type="file"
              ref={fileInputRef}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent"
              accept="application/pdf,image/*"
              onChange={handleFileChange}
              disabled={uploading}
            />
          </div>
        </div>
        {uploading && (
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Uploading...</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-[#be0b32] h-2 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentUpload;
