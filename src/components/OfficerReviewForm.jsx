import React, { useState } from 'react';
import axios from '../api/axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OfficerReviewForm = () => {
  const { id } = useParams(); // application id
  const [decision, setDecision] = useState('Approved');
  const [remarks, setRemarks] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/reviews', {
        application_id: id,
        decision,
        remarks
      });
      toast.success('Review submitted!');
      navigate('/officer-dashboard');
    } catch {
      toast.error('Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl space-y-6">
        <div className="mb-4">
          <h2 className="text-3xl font-bold text-[#be0b32]">Review Application</h2>
          <p className="text-gray-600 mt-1">Provide your decision and remarks for this application</p>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Decision</label>
          <select
            value={decision}
            onChange={e => setDecision(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent"
            required
          >
            <option value="Approved">Approve</option>
            <option value="Rejected">Reject</option>
            <option value="More Info Required">More Info Required</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Remarks</label>
          <textarea
            value={remarks}
            onChange={e => setRemarks(e.target.value)}
            className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent"
            rows={5}
            placeholder="Add detailed remarks for the applicant..."
            required
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-[#be0b32] text-white py-3 rounded-lg font-semibold hover:bg-[#8c0826] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/officer-dashboard')}
            className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors duration-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default OfficerReviewForm;
