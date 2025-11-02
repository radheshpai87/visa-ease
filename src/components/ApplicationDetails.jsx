import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import DocumentUpload from './DocumentUpload';

const ApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

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
  }, [id]);

  if (loading) return (
    <div className="p-8 bg-gray-50 min-h-screen flex justify-center items-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#be0b32]"></div>
    </div>
  );
  
  if (!application) return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-600">Application not found.</p>
        <button onClick={() => navigate(-1)} className="mt-4 text-[#be0b32] hover:text-[#8c0826]">← Go Back</button>
      </div>
    </div>
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <button onClick={() => navigate(-1)} className="text-sm text-gray-600 hover:text-[#be0b32] mb-4">← Back</button>
          <h2 className="text-3xl font-bold text-[#be0b32]">Application Details</h2>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Application Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Visa Type</p>
              <p className="font-semibold">{application.type_id?.name || '-'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                application.status_id?.name === 'Approved' ? 'bg-green-100 text-green-800' :
                application.status_id?.name === 'Rejected' ? 'bg-red-100 text-red-800' :
                application.status_id?.name === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {application.status_id?.name || '-'}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">Appointment Date</p>
              <p className="font-semibold">
                {application.appointment_date ? new Date(application.appointment_date).toLocaleDateString() : '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Assigned Officer</p>
              <p className="font-semibold">{application.assigned_officer_id ? application.assigned_officer_id.full_name : '-'}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-sm text-gray-500">Notes</p>
              <p className="font-semibold">{application.notes || 'No notes'}</p>
            </div>
          </div>
        </div>

        {/* Document Upload Section */}
        <div className="mb-6">
          <DocumentUpload applicationId={id} onUpload={fetchDetails} />
        </div>

        {/* Documents Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Documents</h3>
          {documents.length === 0 ? (
            <p className="text-gray-600">No documents uploaded yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {documents.map(doc => (
                <div key={doc._id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <svg className="h-8 w-8 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900">{doc.document_type}</p>
                        {doc.verified && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                            <svg className="mr-1 h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                    <a 
                      href={doc.file_path} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#be0b32] hover:text-[#8c0826] font-medium"
                    >
                      View
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Reviews</h3>
          {reviews.length === 0 ? (
            <p className="text-gray-600">No reviews yet.</p>
          ) : (
            <div className="space-y-4">
              {reviews.map(rev => (
                <div key={rev._id} className="border-l-4 border-[#be0b32] pl-4 py-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-3 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${
                      rev.decision === 'Approved' ? 'bg-green-100 text-green-800' :
                      rev.decision === 'Rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {rev.decision}
                    </span>
                    <p className="text-sm text-gray-500">
                      {rev.review_date ? new Date(rev.review_date).toLocaleDateString() : '-'}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Reviewed by: <span className="font-medium">{rev.officer_id?.full_name || 'Unknown Officer'}</span>
                  </p>
                  <p className="text-gray-700">{rev.remarks || 'No remarks'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
