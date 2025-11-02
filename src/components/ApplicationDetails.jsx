import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DocumentUpload from './DocumentUpload';
import { useAuth } from '../context/AuthContext';
import { 
  FaArrowLeft, FaCheckCircle, FaTimesCircle, FaClock, FaFileAlt, 
  FaUser, FaCalendarAlt, FaShieldAlt, FaClipboardCheck, FaEdit,
  FaDownload, FaEye, FaUpload, FaPassport, FaUserTie
} from 'react-icons/fa';

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [application, setApplication] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({
    decision: 'Approved',
    remarks: ''
  });
  const [showReviewForm, setShowReviewForm] = useState(false);

  const isOfficer = user?.role === 'officer' || user?.role === 'admin';
  const isApplicant = user?.role === 'applicant';

  const fetchDetails = async () => {
    try {
      setLoading(true);
      const [appRes, docRes, revRes] = await Promise.all([
        axios.get(`/applications/${id}`),
        axios.get(`/documents/${id}`),
        axios.get(`/reviews?application_id=${id}`)
      ]);
      setApplication(appRes.data);
      setDocuments(docRes.data);
      setReviews(revRes.data);
    } catch {
      toast.error('Failed to load application details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/reviews', {
        application_id: id,
        decision: reviewForm.decision,
        remarks: reviewForm.remarks
      });
      toast.success('Review submitted successfully');
      setShowReviewForm(false);
      setReviewForm({ decision: 'Approved', remarks: '' });
      fetchDetails();
    } catch {
      toast.error('Failed to submit review');
    }
  };

  const handleVerifyDocument = async (docId) => {
    try {
      await axios.patch(`/documents/verify/${docId}`, { verified: true });
      toast.success('Document verified successfully');
      fetchDetails();
    } catch {
      toast.error('Failed to verify document');
    }
  };

  const getStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved': return 'from-green-500 to-emerald-600';
      case 'rejected': return 'from-red-500 to-rose-600';
      case 'pending': return 'from-yellow-500 to-amber-600';
      case 'under review': return 'from-blue-500 to-indigo-600';
      default: return 'from-gray-500 to-slate-600';
    }
  };

  const getStatusIcon = (status) => {
    switch(status?.toLowerCase()) {
      case 'approved': return <FaCheckCircle className="text-green-500" />;
      case 'rejected': return <FaTimesCircle className="text-red-500" />;
      case 'pending': return <FaClock className="text-yellow-500" />;
      default: return <FaClock className="text-blue-500" />;
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 flex justify-center items-center p-8">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-t-4 border-purple-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-medium">Loading application details...</p>
      </div>
    </div>
  );
  
  if (!application) return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 flex justify-center items-center p-8">
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl p-12 text-center max-w-md">
        <div className="mb-6">
          <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Not Found</h2>
          <p className="text-gray-600">The application you're looking for doesn't exist or you don't have permission to view it.</p>
        </div>
        <button 
          onClick={() => navigate(-1)} 
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl font-medium flex items-center gap-2 mx-auto"
        >
          <FaArrowLeft /> Go Back
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="group flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 font-medium transition-all"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/50">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
                  Application Details
                </h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <FaFileAlt className="text-purple-500" />
                  Application ID: <span className="font-mono font-semibold text-gray-800">{id}</span>
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className={`bg-gradient-to-r ${getStatusColor(application.status_id?.name)} text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 font-semibold`}>
                  {getStatusIcon(application.status_id?.name)}
                  <span>{application.status_id?.name || 'Unknown'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Application Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Application Information Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <FaFileAlt className="text-white" />
                </div>
                Application Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="group">
                  <div className="flex items-center gap-2 mb-2">
                    <FaPassport className="text-purple-500" />
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Visa Type</p>
                  </div>
                  <p className="text-lg font-bold text-gray-800 ml-6">{application.type_id?.name || '-'}</p>
                </div>
                
                <div className="group">
                  <div className="flex items-center gap-2 mb-2">
                    <FaCalendarAlt className="text-pink-500" />
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Appointment Date</p>
                  </div>
                  <p className="text-lg font-bold text-gray-800 ml-6">
                    {application.appointment_date 
                      ? new Date(application.appointment_date).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
                      : '-'}
                  </p>
                </div>

                {isOfficer && (
                  <div className="group">
                    <div className="flex items-center gap-2 mb-2">
                      <FaUser className="text-red-500" />
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Applicant</p>
                    </div>
                    <p className="text-lg font-bold text-gray-800 ml-6">
                      {application.applicant_id?.user_id?.username || 'N/A'}
                    </p>
                  </div>
                )}
                
                {application.assigned_officer_id && (
                  <div className="group">
                    <div className="flex items-center gap-2 mb-2">
                      <FaUserTie className="text-indigo-500" />
                      <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Assigned Officer</p>
                    </div>
                    <p className="text-lg font-bold text-gray-800 ml-6">
                      {application.assigned_officer_id.full_name}
                    </p>
                  </div>
                )}

                <div className="md:col-span-2 group">
                  <div className="flex items-center gap-2 mb-2">
                    <FaClipboardCheck className="text-purple-500" />
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Notes</p>
                  </div>
                  <p className="text-gray-700 ml-6 bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                    {application.notes || 'No additional notes'}
                  </p>
                </div>

                {/* Payment Status */}
                <div className="md:col-span-2 group">
                  <div className="flex items-center gap-2 mb-2">
                    <FaCheckCircle className={application.payment?.status === 'paid' ? 'text-green-500' : 'text-yellow-500'} />
                    <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Payment Status</p>
                  </div>
                  <div className="ml-6 bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between flex-wrap gap-3">
                      <div>
                        <p className="text-lg font-bold text-gray-800 mb-1">
                          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold ${
                            application.payment?.status === 'paid' 
                              ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white' 
                              : application.payment?.status === 'failed'
                              ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white'
                              : 'bg-gradient-to-r from-yellow-500 to-amber-600 text-white'
                          }`}>
                            {application.payment?.status === 'paid' && <FaCheckCircle />}
                            {application.payment?.status === 'failed' && <FaTimesCircle />}
                            {(!application.payment?.status || application.payment?.status === 'pending') && <FaClock />}
                            {application.payment?.status?.toUpperCase() || 'PENDING'}
                          </span>
                        </p>
                        {application.payment?.paid_at && (
                          <p className="text-sm text-gray-600 mt-2">
                            Paid on: {new Date(application.payment.paid_at).toLocaleDateString('en-IN', { 
                              day: '2-digit', 
                              month: 'short', 
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                          ₹{application.payment?.amount?.toLocaleString('en-IN') || application.type_id?.fee?.toLocaleString('en-IN') || '0'}
                        </p>
                        <p className="text-sm text-gray-500 font-medium">{application.payment?.currency || 'INR'}</p>
                      </div>
                    </div>
                    {application.payment?.razorpay_payment_id && (
                      <div className="mt-3 pt-3 border-t border-blue-300">
                        <p className="text-xs text-gray-600">
                          <span className="font-semibold">Transaction ID:</span> 
                          <span className="font-mono ml-1">{application.payment.razorpay_payment_id}</span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center">
                  <FaFileAlt className="text-white" />
                </div>
                Documents
              </h2>
              
              {/* Upload Section - Only for applicants */}
              {isApplicant && (
                <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-dashed border-purple-300">
                  <DocumentUpload applicationId={id} onUpload={fetchDetails} />
                </div>
              )}

              {documents.length === 0 ? (
                <div className="text-center py-12">
                  <FaFileAlt className="text-gray-300 text-6xl mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No documents uploaded yet</p>
                  {isApplicant && <p className="text-sm text-gray-400 mt-2">Upload your required documents above</p>}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {documents.map(doc => (
                    <div 
                      key={doc._id} 
                      className="group bg-gradient-to-br from-white to-purple-50 border-2 border-purple-200 rounded-xl p-4 hover:shadow-xl transition-all hover:scale-105"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                            <FaFileAlt className="text-white text-xl" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-800">{doc.document_type}</p>
                            {doc.verified && (
                              <div className="flex items-center gap-1 mt-1">
                                <FaCheckCircle className="text-green-500 text-sm" />
                                <span className="text-xs font-semibold text-green-600">Verified</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <a 
                          href={doc.file_path}
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium text-sm flex items-center justify-center gap-2"
                        >
                          <FaEye /> View
                        </a>
                        {isOfficer && !doc.verified && (
                          <button
                            onClick={() => handleVerifyDocument(doc._id)}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all font-medium text-sm flex items-center gap-2"
                          >
                            <FaShieldAlt /> Verify
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <FaClipboardCheck className="text-white" />
                  </div>
                  Reviews & Feedback
                </h2>
                {isOfficer && (
                  <button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium text-sm flex items-center gap-2 shadow-lg"
                  >
                    <FaEdit /> Add Review
                  </button>
                )}
              </div>

              {/* Review Form - Officers Only */}
              {isOfficer && showReviewForm && (
                <form onSubmit={handleSubmitReview} className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Decision</label>
                      <select
                        value={reviewForm.decision}
                        onChange={(e) => setReviewForm({...reviewForm, decision: e.target.value})}
                        className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                        required
                      >
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                        <option value="More Info Required">More Info Required</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-gray-700 mb-2">Remarks</label>
                    <textarea
                      value={reviewForm.remarks}
                      onChange={(e) => setReviewForm({...reviewForm, remarks: e.target.value})}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                      rows={4}
                      placeholder="Enter your review comments..."
                      required
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all font-medium shadow-lg flex items-center gap-2"
                    >
                      <FaCheckCircle /> Submit Review
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="bg-gray-300 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-400 transition-all font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              {/* Reviews List */}
              {reviews.length === 0 ? (
                <div className="text-center py-12">
                  <FaClipboardCheck className="text-gray-300 text-6xl mx-auto mb-4" />
                  <p className="text-gray-500 font-medium">No reviews submitted yet</p>
                  {isOfficer && <p className="text-sm text-gray-400 mt-2">Be the first to review this application</p>}
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map(rev => (
                    <div 
                      key={rev._id} 
                      className="bg-gradient-to-r from-white to-purple-50 border-l-4 border-purple-500 rounded-xl p-5 shadow-md hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 bg-gradient-to-r ${
                            rev.decision === 'Approved' ? 'from-green-500 to-emerald-600' :
                            rev.decision === 'Rejected' ? 'from-red-500 to-rose-600' :
                            'from-yellow-500 to-amber-600'
                          } rounded-lg flex items-center justify-center`}>
                            {rev.decision === 'Approved' ? <FaCheckCircle className="text-white" /> :
                             rev.decision === 'Rejected' ? <FaTimesCircle className="text-white" /> :
                             <FaClock className="text-white" />}
                          </div>
                          <div>
                            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                              rev.decision === 'Approved' ? 'bg-green-100 text-green-700' :
                              rev.decision === 'Rejected' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {rev.decision}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 font-medium">
                          {rev.review_date 
                            ? new Date(rev.review_date).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' })
                            : '-'}
                        </p>
                      </div>
                      <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                        <FaUser className="text-purple-500" />
                        <span className="font-semibold">Reviewed by:</span> {rev.officer_id?.full_name || 'Unknown Officer'}
                      </p>
                      <p className="text-gray-700 bg-white p-4 rounded-lg">{rev.remarks || 'No remarks provided'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Quick Info Sidebar */}
          <div className="lg:sticky lg:top-8 space-y-6 self-start">
            {/* Status Timeline Card */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/50">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <FaClock className="text-purple-500" />
                Application Timeline
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <FaCheckCircle className="text-white text-sm" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">Submitted</p>
                    <p className="text-xs text-gray-500">
                      {new Date(application.createdAt || Date.now()).toLocaleDateString('en-IN', { 
                        day: '2-digit', 
                        month: 'short', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
                
                {application.status_id?.name === 'Under Review' && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                      <FaClock className="text-white text-sm" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Under Review</p>
                      <p className="text-xs text-gray-500">In progress...</p>
                    </div>
                  </div>
                )}

                {(application.status_id?.name === 'Approved' || application.status_id?.name === 'Rejected') && (
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 bg-gradient-to-br ${
                      application.status_id?.name === 'Approved' 
                        ? 'from-green-500 to-emerald-600' 
                        : 'from-red-500 to-rose-600'
                    } rounded-full flex items-center justify-center flex-shrink-0`}>
                      {application.status_id?.name === 'Approved' 
                        ? <FaCheckCircle className="text-white text-sm" />
                        : <FaTimesCircle className="text-white text-sm" />
                      }
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{application.status_id?.name}</p>
                      <p className="text-xs text-gray-500">Final decision</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/50">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <span className="text-gray-600 flex items-center gap-2">
                    <FaFileAlt className="text-purple-500" />
                    Documents
                  </span>
                  <span className="font-bold text-purple-600">{documents.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-pink-50 to-red-50 rounded-lg">
                  <span className="text-gray-600 flex items-center gap-2">
                    <FaClipboardCheck className="text-pink-500" />
                    Reviews
                  </span>
                  <span className="font-bold text-pink-600">{reviews.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                  <span className="text-gray-600 flex items-center gap-2">
                    <FaCheckCircle className="text-green-500" />
                    Verified Docs
                  </span>
                  <span className="font-bold text-green-600">
                    {documents.filter(d => d.verified).length}
                  </span>
                </div>
              </div>
            </div>

            {/* Officer Actions */}
            {isOfficer && (
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaShieldAlt />
                  Officer Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowReviewForm(true)}
                    className="w-full bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white px-4 py-3 rounded-xl transition-all font-medium flex items-center justify-center gap-2 border border-white/30"
                  >
                    <FaEdit /> Submit Review
                  </button>
                  <button
                    className="w-full bg-white/20 backdrop-blur-lg hover:bg-white/30 text-white px-4 py-3 rounded-xl transition-all font-medium flex items-center justify-center gap-2 border border-white/30"
                  >
                    <FaDownload /> Download All Docs
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
