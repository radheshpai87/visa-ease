import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaFileAlt, FaClock, FaCheckCircle, FaTimesCircle, FaSearch, FaSignOutAlt } from 'react-icons/fa';

const ApplicantDashboard = () => {
  const { user, logout } = useAuth();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [appsRes, statsRes] = await Promise.all([
          axios.get('/applicant/applications'),
          axios.get('/applicant/statistics')
        ]);
        setApplications(appsRes.data);
        setFilteredApplications(appsRes.data);
        setStatistics(statsRes.data);
      } catch {
        toast.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter and sort applications
  useEffect(() => {
    let filtered = [...applications];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(app => 
        app.type_id?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.notes?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(app => 
        app.status_id?.name?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'date-desc':
          return new Date(b.application_date) - new Date(a.application_date);
        case 'date-asc':
          return new Date(a.application_date) - new Date(b.application_date);
        case 'type':
          return (a.type_id?.name || '').localeCompare(b.type_id?.name || '');
        default:
          return 0;
      }
    });

    setFilteredApplications(filtered);
  }, [searchTerm, statusFilter, sortBy, applications]);

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
      'in review': 'bg-blue-100 text-blue-800 border-blue-300',
      'approved': 'bg-green-100 text-green-800 border-green-300',
      'rejected': 'bg-red-100 text-red-800 border-red-300',
      'more info required': 'bg-purple-100 text-purple-800 border-purple-300'
    };
    return colors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#be0b32] to-[#8c0826] text-white py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.username}!</h1>
            <p className="text-gray-100">Manage your visa applications and track their progress</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/40"
          >
            <FaSignOutAlt className="text-lg" />
            <span className="font-semibold">Logout</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Statistics Cards */}
        {loading && !statistics ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {/* Total Applications */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#be0b32] hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Applications</p>
                  <p className="text-3xl font-bold text-gray-800">{statistics.totalApplications}</p>
                </div>
                <FaFileAlt className="text-4xl text-[#be0b32] opacity-20" />
              </div>
            </div>

            {/* Pending */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{statistics.pendingCount}</p>
                </div>
                <FaClock className="text-4xl text-yellow-500 opacity-20" />
              </div>
            </div>

            {/* In Review */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">In Review</p>
                  <p className="text-3xl font-bold text-blue-600">{statistics.inReviewCount}</p>
                </div>
                <FaFileAlt className="text-4xl text-blue-500 opacity-20" />
              </div>
            </div>

            {/* Approved */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Approved</p>
                  <p className="text-3xl font-bold text-green-600">{statistics.approvedCount}</p>
                </div>
                <FaCheckCircle className="text-4xl text-green-500 opacity-20" />
              </div>
            </div>

            {/* Rejected */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">{statistics.rejectedCount}</p>
                </div>
                <FaTimesCircle className="text-4xl text-red-500 opacity-20" />
              </div>
            </div>
          </div>
        )}

        {/* Actions Bar */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by visa type or notes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32]"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32]"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="in review">In Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="more info required">More Info Required</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32]"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="type">Sort by Type</option>
              </select>

              <button
                onClick={() => navigate('/application-history')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <FaFileAlt className="w-4 h-4" />
                View History
              </button>

              <button
                onClick={() => navigate('/apply')}
                className="bg-[#be0b32] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#8c0826] transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                New Application
              </button>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#be0b32]"></div>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-gray-600 mb-4">
              {applications.length === 0 
                ? 'No applications found. Start by applying for a visa.' 
                : 'No applications match your filters.'}
            </p>
            {applications.length === 0 && (
              <button
                className="bg-[#be0b32] text-white px-6 py-2 rounded-lg hover:bg-[#8c0826] transition-colors"
                onClick={() => navigate('/apply')}
              >
                Apply Now
              </button>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visa Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredApplications.map(app => (
                    <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{app.type_id?.name || '-'}</div>
                        {app.notes && (
                          <div className="text-sm text-gray-500 truncate max-w-xs">{app.notes}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(app.application_date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(app.status_id?.name)}`}>
                          {app.status_id?.name || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.appointment_date ? new Date(app.appointment_date).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        }) : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <Link 
                          to={`/applications/${app._id}`} 
                          className="bg-[#be0b32] text-white px-4 py-2 rounded-lg hover:bg-[#8c0826] transition-colors inline-block"
                        >
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Results Count */}
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing <span className="font-medium">{filteredApplications.length}</span> of <span className="font-medium">{applications.length}</span> applications
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantDashboard;
