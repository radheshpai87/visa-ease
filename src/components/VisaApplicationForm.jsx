import React, { useEffect, useState, useCallback } from 'react';
import axios from '../api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDropzone } from 'react-dropzone';
import { FaUser, FaPassport, FaPlane, FaUpload, FaCheckCircle, FaTimesCircle, FaFileAlt, FaTrash, FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';

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
        const response = await axios.get('/visa-types');
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
      const applicationResponse = await axios.post('/applications', {
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
          
          const response = await axios.post('/documents/upload', formDataUpload, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
          
          console.log(`Upload response for ${file.name}:`, response.data);
          return response;
        });

        const uploadResults = await Promise.all(uploadPromises);
        console.log('All uploads completed:', uploadResults.map(r => r.data));
      }

      // Initiate payment process
      toast.info('Processing payment...');
      
      // Get visa type fee from the selected visa type
      const selectedVisaType = visaTypes.find(type => type._id === formData.type_id);
      const amount = selectedVisaType?.fee || 0;

      if (amount <= 0) {
        toast.error('Invalid visa fee. Please contact support.');
        setLoading(false);
        return;
      }

      // Create Razorpay order
      const orderResponse = await axios.post('/payment/create-order', {
        applicationId,
        amount
      });

      const orderData = orderResponse.data;
      console.log('Order response:', orderData);

      // Check if in test mode
      if (orderData.testMode) {
        console.log('🧪 Test mode detected - auto-approving payment');
        
        // Simulate payment and verify immediately
        try {
          const verifyResponse = await axios.post('/payment/verify', {
            razorpay_order_id: orderData.order.id,
            razorpay_payment_id: `test_payment_${Date.now()}`,
            razorpay_signature: 'test_signature',
            applicationId
          });

          if (verifyResponse.data.success) {
            toast.success('Payment successful! (Test Mode) Application submitted.');
            navigate('/applicant-dashboard');
          } else {
            toast.error('Payment verification failed. Please contact support.');
          }
        } catch (error) {
          console.error('Payment verification error:', error);
          toast.error('Payment verification failed. Please contact support.');
        } finally {
          setLoading(false);
        }
        return;
      }

      // Normal Razorpay flow
      // Check if Razorpay script is loaded
      if (!window.Razorpay) {
        toast.error('Payment system not loaded. Please refresh the page.');
        setLoading(false);
        return;
      }

      const { order, key } = orderData;

      // Validate order data
      if (!order || !order.id) {
        console.error('Invalid order data:', orderData);
        toast.error('Failed to initialize payment. Please try again.');
        setLoading(false);
        return;
      }

      console.log('Initializing Razorpay with order:', order.id);

      // Configure Razorpay checkout
      const options = {
        key: key || import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_demo',
        amount: order.amount,
        currency: order.currency,
        name: 'VisaEase',
        description: `Visa Application Fee - ${selectedVisaType.name}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            // Verify payment
            const verifyResponse = await axios.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              applicationId
            });

            if (verifyResponse.data.success) {
              toast.success('Payment successful! Application submitted.');
              navigate('/applicant-dashboard');
            } else {
              toast.error('Payment verification failed. Please contact support.');
            }
          } catch (error) {
            console.error('Payment verification error:', error);
            toast.error('Payment verification failed. Please contact support.');
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: formData.full_name,
          email: '', // Add user email if available
          contact: '' // Add user phone if available
        },
        theme: {
          color: '#9333ea' // Purple color matching your theme
        },
        modal: {
          ondismiss: function() {
            toast.warning('Payment cancelled. Your application is saved but not submitted.');
            setLoading(false);
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (error) {
      console.error('Submission error:', error);
      toast.error(error.response?.data?.message || 'Failed to submit application');
      setLoading(false);
    }
  };

  // Progress indicator
  const ProgressBar = () => (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        {[1, 2, 3].map((step) => (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center flex-1">
              <div className={`flex items-center justify-center w-14 h-14 rounded-full font-bold transition-all shadow-lg ${
                currentStep >= step 
                  ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white scale-110' 
                  : 'bg-gray-200 text-gray-500'
              }`}>
                {currentStep > step ? <FaCheckCircle className="text-xl" /> : <span className="text-lg">{step}</span>}
              </div>
              <div className={`mt-3 text-sm font-semibold text-center transition-colors ${
                currentStep >= step 
                  ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600' 
                  : 'text-gray-500'
              }`}>
                {step === 1 && 'Personal Info'}
                {step === 2 && 'Travel Details'}
                {step === 3 && 'Documents'}
              </div>
            </div>
            {step < 3 && (
              <div className={`h-2 w-full max-w-[150px] mx-2 rounded-full transition-all self-start mt-6 ${
                currentStep > step ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-red-600' : 'bg-gray-200'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/applicant-dashboard')}
          className="mb-6 group flex items-center gap-2 text-gray-600 hover:text-purple-700 transition-all font-semibold px-4 py-2 rounded-lg hover:bg-white/50"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Dashboard
        </button>
        
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-t-2xl shadow-xl p-8 border-b-4 border-transparent bg-clip-padding relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-3 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-xl shadow-lg">
                <FaFileAlt className="text-3xl text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
                  New Visa Application
                </h1>
                <p className="text-gray-600 font-medium mt-1">Complete all steps to submit your application</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-b-2xl shadow-xl p-8 border border-gray-100">
          <ProgressBar />

          <form onSubmit={handleSubmit}>
            {/* Step 1: Personal Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gradient-to-r from-purple-200 to-pink-200">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl">
                    <FaUser className="text-3xl text-purple-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                    Personal Information
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                      <span className="text-purple-600">●</span> Full Name *
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      value={formData.full_name}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300 bg-white/50"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                      <span className="text-pink-600">●</span> Passport Number *
                    </label>
                    <input
                      type="text"
                      name="passport_number"
                      value={formData.passport_number}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all hover:border-pink-300 bg-white/50 font-mono"
                      placeholder="e.g., A12345678"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                      <span className="text-purple-600">●</span> Nationality *
                    </label>
                    <input
                      type="text"
                      name="nationality"
                      value={formData.nationality}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300 bg-white/50"
                      placeholder="Your nationality"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                      <span className="text-red-600">●</span> Date of Birth *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-red-300 bg-white/50 cursor-pointer"
                        required
                        lang="en-IN"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 group">
                    <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                      <span className="text-pink-600">●</span> Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all hover:border-pink-300 bg-white/50"
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
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gradient-to-r from-pink-200 to-red-200">
                  <div className="p-3 bg-gradient-to-br from-pink-100 to-red-100 rounded-xl">
                    <FaPlane className="text-3xl text-pink-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600">
                    Travel Details
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                      <span className="text-purple-600">●</span> Visa Type *
                    </label>
                    <select
                      name="type_id"
                      value={formData.type_id}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300 bg-white/50 font-semibold"
                      required
                    >
                      <option value="">Select Visa Type</option>
                      {visaTypes.map((type) => (
                        <option key={type._id} value={type._id}>
                          {type.name} - ₹{type.fee?.toLocaleString('en-IN')}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="group">
                    <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                      <span className="text-pink-600">●</span> Purpose of Travel *
                    </label>
                    <input
                      type="text"
                      name="purpose_of_travel"
                      value={formData.purpose_of_travel}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all hover:border-pink-300 bg-white/50"
                      placeholder="e.g., Tourism, Business, Study"
                      required
                    />
                  </div>

                  <div className="group">
                    <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                      <span className="text-red-600">●</span> Intended Arrival Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="intended_arrival_date"
                        value={formData.intended_arrival_date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-red-300 bg-white/50 cursor-pointer"
                        required
                        lang="en-IN"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                      <span className="text-purple-600">●</span> Intended Departure Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="intended_departure_date"
                        value={formData.intended_departure_date}
                        onChange={handleChange}
                        min={formData.intended_arrival_date || new Date().toISOString().split('T')[0]}
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300 bg-white/50 cursor-pointer"
                        lang="en-IN"
                      />
                    </div>
                  </div>

                  <div className="group">
                    <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                      <span className="text-pink-600">●</span> Duration of Stay
                    </label>
                    <input
                      type="text"
                      name="duration_of_stay"
                      value={formData.duration_of_stay}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all font-semibold text-purple-700"
                      placeholder="Auto-calculated"
                      readOnly
                    />
                  </div>

                  <div className="group">
                    <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                      <span className="text-red-600">●</span> Appointment Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="appointment_date"
                        value={formData.appointment_date}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-red-300 bg-white/50 cursor-pointer"
                        required
                        lang="en-IN"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 group">
                    <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                      <span className="text-purple-600">●</span> Additional Notes
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300 bg-white/50"
                      rows={3}
                      placeholder="Any additional information..."
                    />
                  </div>
                </div>

                {/* Eligibility Hint */}
                <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-cyan-50 border-l-4 border-blue-500 rounded-xl shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">💡</div>
                    <div>
                      <p className="text-sm font-semibold text-blue-900 mb-1">Important Reminder</p>
                      <p className="text-sm text-blue-800">
                        Make sure your passport is valid for at least 6 months from your intended arrival date.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Document Upload */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-gradient-to-r from-purple-200 to-red-200">
                  <div className="p-3 bg-gradient-to-br from-red-100 to-pink-100 rounded-xl">
                    <FaUpload className="text-3xl text-red-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-pink-600">
                    Upload Documents
                  </h2>
                </div>

                {/* Dropzone */}
                <div
                  {...getRootProps()}
                  className={`border-3 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                    isDragActive 
                      ? 'border-purple-600 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg scale-105' 
                      : 'border-gray-300 hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50/50 hover:to-pink-50/50 hover:shadow-md'
                  }`}
                >
                  <input {...getInputProps()} />
                  <div className={`transition-all duration-300 ${isDragActive ? 'scale-110' : ''}`}>
                    <div className="inline-block p-5 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-4">
                      <FaUpload className={`text-5xl ${isDragActive ? 'text-purple-600' : 'text-gray-400'}`} />
                    </div>
                  </div>
                  {isDragActive ? (
                    <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                      Drop files here...
                    </p>
                  ) : (
                    <>
                      <p className="text-lg font-bold text-gray-700 mb-2">
                        Drag & drop files here, or click to select
                      </p>
                      <p className="text-sm text-gray-500 font-medium">
                        Supported formats: JPG, PNG, PDF (max 5MB per file)
                      </p>
                    </>
                  )}
                </div>

                {/* Uploaded Files List */}
                {uploadedFiles.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
                      <h3 className="font-bold text-gray-700 flex items-center gap-2">
                        <FaCheckCircle className="text-green-600" />
                        Uploaded Files ({uploadedFiles.length})
                      </h3>
                      <span className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full text-sm font-bold shadow-md">
                        ✓ Ready to Submit
                      </span>
                    </div>
                    {uploadedFiles.map((fileObj, index) => (
                      <div key={index} className="group flex items-center justify-between p-5 bg-gradient-to-r from-white to-purple-50 rounded-xl border-2 border-purple-200 hover:shadow-lg hover:border-purple-400 transition-all duration-300">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl group-hover:scale-110 transition-transform">
                            <FaFileAlt className="text-2xl text-purple-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-800 truncate">{fileObj.name}</p>
                            <p className="text-sm text-gray-600 font-medium mt-1">
                              {(fileObj.size / 1024).toFixed(2)} KB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="ml-4 p-3 text-red-600 hover:bg-red-100 rounded-xl transition-all hover:scale-110 group-hover:shadow-md"
                          title="Remove file"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Document Requirements */}
                <div className="mt-6 p-5 bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-500 rounded-xl shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">📋</div>
                    <div className="flex-1">
                      <h4 className="font-bold text-yellow-900 mb-3">Required Documents:</h4>
                      <ul className="text-sm text-yellow-800 space-y-2">
                        <li className="flex items-center gap-2">
                          <span className="inline-block w-2 h-2 bg-yellow-600 rounded-full"></span>
                          <span className="font-medium">Valid passport (bio-data page)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="inline-block w-2 h-2 bg-yellow-600 rounded-full"></span>
                          <span className="font-medium">Recent passport-size photograph</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="inline-block w-2 h-2 bg-yellow-600 rounded-full"></span>
                          <span className="font-medium">Proof of accommodation (if applicable)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="inline-block w-2 h-2 bg-yellow-600 rounded-full"></span>
                          <span className="font-medium">Travel itinerary (if applicable)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {uploadedFiles.length === 0 && (
                  <div className="text-center p-5 bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-red-500 rounded-xl shadow-sm">
                    <div className="flex items-center justify-center gap-3">
                      <div className="text-3xl">⚠️</div>
                      <div className="text-left">
                        <p className="text-sm font-bold text-red-900 mb-1">Document Upload Required</p>
                        <p className="text-sm text-red-800">
                          You must upload at least one document to submit the application. Please upload the required documents listed above.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t-2 border-gray-200">
              <button
                type="button"
                onClick={currentStep === 1 ? () => navigate('/applicant-dashboard') : prevStep}
                className="group px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl font-bold hover:from-gray-200 hover:to-gray-300 transition-all shadow-md hover:shadow-lg flex items-center gap-2 hover:scale-105 duration-300"
              >
                <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                {currentStep === 1 ? 'Cancel' : 'Previous'}
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="group px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white rounded-xl font-bold hover:shadow-xl transition-all shadow-lg flex items-center gap-2 hover:scale-105 duration-300"
                >
                  Next Step
                  <FaPlane className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading || uploading || uploadedFiles.length === 0}
                  className="group px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-xl transition-all shadow-lg flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 hover:scale-105 duration-300"
                  title={uploadedFiles.length === 0 ? 'Please upload at least one document' : ''}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Submitting Application...
                    </>
                  ) : (
                    <>
                      <FaCheckCircle className="text-xl group-hover:scale-110 transition-transform" />
                      <span>
                        Submit Application
                        {uploadedFiles.length === 0 && ' (Upload Required)'}
                      </span>
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
