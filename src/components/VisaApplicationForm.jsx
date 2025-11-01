import React, { useEffect, useState, useCallback } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { FaUser, FaPassport, FaPlane, FaUpload, FaCheckCircle, FaTimesCircle, FaFileAlt, FaTrash } from 'react-icons/fa';

const VisaApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [visaTypes, setVisaTypes] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form data for all steps
  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    full_name: '',
    passport_number: '',
    nationality: '',
    date_of_birth: '',
    address: '',
    
    // Step 2: Travel Details
    type_id: '',
    purpose_of_travel: '',
    intended_arrival_date: '',
    intended_departure_date: '',
    duration_of_stay: '',
    appointment_date: '',
    notes: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchVisaTypes = async () => {
      try {
        const response = await axios.get('/api/visa-types');
        setVisaTypes(response.data);
      } catch {
        toast.error('Failed to load visa types');
      }
    };
    fetchVisaTypes();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-calculate duration of stay
    if (name === 'intended_arrival_date' || name === 'intended_departure_date') {
      const arrival = name === 'intended_arrival_date' ? value : formData.intended_arrival_date;
      const departure = name === 'intended_departure_date' ? value : formData.intended_departure_date;
      
      if (arrival && departure) {
        const days = Math.ceil((new Date(departure) - new Date(arrival)) / (1000 * 60 * 60 * 24));
        setFormData(prev => ({ ...prev, duration_of_stay: days > 0 ? `${days} days` : '' }));
      }
    }
  };

  // React Dropzone configuration
  const onDrop = useCallback(async (acceptedFiles) => {
    setUploading(true);
    
    for (const file of acceptedFiles) {
      try {
        // Create a preview URL for the file
        const fileWithPreview = {
          file,
          name: file.name,
          size: file.size,
          preview: URL.createObjectURL(file),
          uploading: false,
          uploaded: false
        };
        
        setUploadedFiles(prev => [...prev, fileWithPreview]);
        toast.success(`${file.name} added successfully`);
      } catch {
        toast.error(`Failed to add ${file.name}`);
      }
    }
    
    setUploading(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.pdf'],
      'application/pdf': ['.pdf']
    },
    maxSize: 5242880, // 5MB
    multiple: true
  });

  // Remove file from upload list
  const removeFile = (index) => {
    setUploadedFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
    toast.info('File removed');
  };

  // Validation functions
  const validateStep1 = () => {
    const { full_name, passport_number, nationality, date_of_birth, address } = formData;
    if (!full_name || !passport_number || !nationality || !date_of_birth || !address) {
      toast.error('Please fill in all personal information fields');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    const { type_id, purpose_of_travel, intended_arrival_date, appointment_date } = formData;
    if (!type_id || !purpose_of_travel || !intended_arrival_date || !appointment_date) {
      toast.error('Please fill in all travel details');
      return false;
    }
    return true;
  };

  // Navigation functions
  const nextStep = () => {
    if (currentStep === 1 && !validateStep1()) return;
    if (currentStep === 2 && !validateStep2()) return;
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Submit application
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateStep1() || !validateStep2()) {
      toast.error('Please complete all required fields');
      return;
    }

    // Validate that at least one document is uploaded
    if (uploadedFiles.length === 0) {
      toast.error('Please upload at least one document before submitting');
      return;
    }

    setLoading(true);

    try {
      // First, create the application
      const applicationResponse = await axios.post('/api/applications', {
        type_id: formData.type_id,
        appointment_date: formData.appointment_date,
        notes: formData.notes || `Purpose: ${formData.purpose_of_travel}. Travel dates: ${formData.intended_arrival_date} to ${formData.intended_departure_date || 'TBD'}`
      });

      const applicationId = applicationResponse.data._id;

      // Upload documents if any
      if (uploadedFiles.length > 0) {
        console.log('Starting document uploads...', uploadedFiles.length, 'files');
        
        const uploadPromises = uploadedFiles.map(async ({ file }, index) => {
          console.log(`Uploading file ${index + 1}:`, {
            name: file.name,
            type: file.type,
            size: file.size
          });
          
          const formDataUpload = new FormData();
          formDataUpload.append('document', file);
          formDataUpload.append('application_id', applicationId);
          
          // Determine document type based on file type
          let docType = 'general';
          if (file.type.includes('pdf')) {
            docType = 'passport';
          } else if (file.type.includes('image')) {
            docType = 'photo';
          }
          formDataUpload.append('document_type', docType);
          
          console.log(`Sending upload request for: ${file.name}, type: ${docType}`);
          
          const response = await axios.post('/api/documents/upload', formDataUpload, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          
          console.log(`Upload response for ${file.name}:`, response.data);
          return response;
        });

        const uploadResults = await Promise.all(uploadPromises);
        console.log('All uploads completed:', uploadResults.map(r => r.data));
      }

      toast.success('Application submitted successfully!');
      navigate('/applicant-dashboard');
    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit application');
    } finally {
      setLoading(false);
    }
  };

  // Progress indicator
  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center flex-1">
            <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold transition-all ${
              currentStep >= step 
                ? 'bg-[#be0b32] text-white shadow-lg' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > step ? <FaCheckCircle /> : step}
            </div>
            {step < 3 && (
              <div className={`flex-1 h-1 mx-2 transition-all ${
                currentStep > step ? 'bg-[#be0b32]' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
      <div className="flex justify-between text-sm font-medium">
        <span className={currentStep >= 1 ? 'text-[#be0b32]' : 'text-gray-500'}>Personal Info</span>
        <span className={currentStep >= 2 ? 'text-[#be0b32]' : 'text-gray-500'}>Travel Details</span>
        <span className={currentStep >= 3 ? 'text-[#be0b32]' : 'text-gray-500'}>Documents</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-lg p-8 border-b-4 border-[#be0b32]">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">New Visa Application</h1>
          <p className="text-gray-600">Complete all steps to submit your application</p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-b-2xl shadow-lg p-8">
          <ProgressBar />

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <FaUser className="text-3xl text-[#be0b32]" />
                  <h2 className="text-2xl font-bold text-gray-800">Personal Information</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Full Name *</label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent transition-all"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Passport Number *</label>
                    <input
                      type="text"
                      name="passport_number"
                      value={formData.passport_number}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent transition-all"
                      placeholder="e.g., A12345678"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Nationality *</label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent transition-all"
                      placeholder="Your nationality"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Date of Birth *</label>
                    <input
                      type="date"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleChange}
                      max={new Date().toISOString().split('T')[0]}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2 font-semibold text-gray-700">Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent transition-all"
                      rows={3}
                      placeholder="Your complete address"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Travel Details */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <FaPlane className="text-3xl text-[#be0b32]" />
                  <h2 className="text-2xl font-bold text-gray-800">Travel Details</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Visa Type *</label>
                    <select
                      name="type_id"
                      value={formData.type_id}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent transition-all"
                      required
                    >
                      <option value="">Select Visa Type</option>
                      {visaTypes.map((type) => (
                        <option key={type._id} value={type._id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Purpose of Travel *</label>
                    <input
                      type="text"
                      name="purpose_of_travel"
                      value={formData.purpose_of_travel}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent transition-all"
                      placeholder="e.g., Tourism, Business, Study"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Intended Arrival Date *</label>
                    <input
                      type="date"
                      name="intended_arrival_date"
                      value={formData.intended_arrival_date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Intended Departure Date</label>
                    <input
                      type="date"
                      name="intended_departure_date"
                      value={formData.intended_departure_date}
                      onChange={handleChange}
                      min={formData.intended_arrival_date || new Date().toISOString().split('T')[0]}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Duration of Stay</label>
                    <input
                      type="text"
                      name="duration_of_stay"
                      value={formData.duration_of_stay}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent transition-all"
                      placeholder="Auto-calculated"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-gray-700">Appointment Date *</label>
                    <input
                      type="date"
                      name="appointment_date"
                      value={formData.appointment_date}
                      onChange={handleChange}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block mb-2 font-semibold text-gray-700">Additional Notes</label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent transition-all"
                      rows={3}
                      placeholder="Any additional information..."
                    />
                  </div>
                </div>

                {/* Eligibility Hint */}
                <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Tip:</strong> Make sure your passport is valid for at least 6 months from your intended arrival date.
                  </p>
                </div>
              </div>
            )}

            {/* Step 3: Document Upload */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6">
                  <FaUpload className="text-3xl text-[#be0b32]" />
                  <h2 className="text-2xl font-bold text-gray-800">Upload Documents</h2>
                </div>

                {/* Dropzone */}
                <div
                  {...getRootProps()}
                  className={`border-3 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                    isDragActive 
                      ? 'border-[#be0b32] bg-red-50' 
                      : 'border-gray-300 hover:border-[#be0b32] hover:bg-gray-50'
                  }`}
                >
                  <input {...getInputProps()} />
                  <FaUpload className="text-6xl text-gray-400 mx-auto mb-4" />
                  {isDragActive ? (
                    <p className="text-lg font-semibold text-[#be0b32]">Drop files here...</p>
                  ) : (
                    <>
                      <p className="text-lg font-semibold text-gray-700 mb-2">
                        Drag & drop files here, or click to select
                      </p>
                      <p className="text-sm text-gray-500">
                        Supported formats: JPG, PNG, PDF (max 5MB per file)
                      </p>
                    </>
                  )}
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-700">Uploaded Files ({uploadedFiles.length})</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        ✓ Ready to Submit
                      </span>
                    </div>
                    {uploadedFiles.map((fileObj, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 flex-1">
                          <FaFileAlt className="text-2xl text-[#be0b32]" />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-800 truncate">{fileObj.name}</p>
                            <p className="text-sm text-gray-500">
                              {(fileObj.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="ml-4 p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Document Requirements */}
                <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-lg">
                  <h4 className="font-semibold text-yellow-800 mb-2">📋 Required Documents:</h4>
                  <ul className="text-sm text-yellow-700 space-y-1 list-disc list-inside">
                    <li>Valid passport (bio-data page)</li>
                    <li>Recent passport-size photograph</li>
                    <li>Proof of accommodation (if applicable)</li>
                    <li>Travel itinerary (if applicable)</li>
                  </ul>
                </div>

                {uploadedFiles.length === 0 && (
                  <div className="text-center p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                    <p className="text-sm text-red-800">
                      <strong>⚠️ Required:</strong> You must upload at least one document to submit the application. Please upload the required documents listed above.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t-2 border-gray-200">
              <button
                type="button"
                onClick={currentStep === 1 ? () => navigate('/applicant-dashboard') : prevStep}
                className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
              >
                ← {currentStep === 1 ? 'Cancel' : 'Previous'}
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-8 py-3 bg-[#be0b32] text-white rounded-lg font-semibold hover:bg-[#8c0826] transition-colors flex items-center gap-2"
                >
                  Next →
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || uploading || uploadedFiles.length === 0}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  title={uploadedFiles.length === 0 ? 'Please upload at least one document' : ''}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle />
                      Submit Application
                      {uploadedFiles.length === 0 && ' (Upload Documents First)'}
                    </>
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VisaApplicationForm;
