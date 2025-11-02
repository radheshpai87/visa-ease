import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaFileAlt, FaClock, FaCheckCircle, FaTimesCircle, FaSearch, FaDownload, FaSignOutAlt, FaUser } from 'react-icons/fa';
import Papa from 'papaparse';
import { useAuth } from '../context/AuthContext';

const OfficerDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

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
          axios.get('/officer/applications'),
          axios.get('/officer/statistics')
        ]);
        setApplications(appsRes.data);
        setFilteredApplications(appsRes.data);
        setStatistics(statsRes.data);
      } catch (error) {
        console.error('Failed to load officer data:', error);
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
        app.applicant_id?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        case 'applicant':
          return (a.applicant_id?.full_name || '').localeCompare(b.applicant_id?.full_name || '');
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

  const exportToCSV = () => {
    const csvData = filteredApplications.map(app => ({
      'Applicant Name': app.applicant_id?.full_name || '-',
      'Nationality': app.applicant_id?.nationality || '-',
      'Visa Type': app.type_id?.name || '-',
      'Status': app.status_id?.name || '-',
      'Application Date': new Date(app.application_date).toLocaleDateString(),
      'Appointment Date': app.appointment_date ? new Date(app.appointment_date).toLocaleDateString() : '-',
      'Notes': app.notes || '-'
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `visa-applications-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Applications exported to CSV');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Officer Dashboard</h1>
            <p className="text-blue-100">Review and process assigned visa applications</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/40"
            >
              <FaUser className="text-lg" />
              <span className="font-semibold">Profile</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/40"
            >
              <FaSignOutAlt className="text-lg" />
              <span className="font-semibold">Logout</span>
            </button>
          </div>
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
            {/* Total Assigned */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Assigned</p>
                  <p className="text-3xl font-bold text-gray-800">{statistics.totalAssigned}</p>
                </div>
                <FaFileAlt className="text-4xl text-blue-600 opacity-20" />
              </div>
            </div>

            {/* Pending Review */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Pending Review</p>
                  <p className="text-3xl font-bold text-yellow-600">{statistics.pendingCount}</p>
                </div>
                <FaClock className="text-4xl text-yellow-500 opacity-20" />
              </div>
            </div>

            {/* In Review */}
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">In Review</p>
                  <p className="text-3xl font-bold text-purple-600">{statistics.inReviewCount}</p>
                </div>
                <FaFileAlt className="text-4xl text-purple-500 opacity-20" />
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
                  placeholder="Search by applicant name, visa type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="applicant">Sort by Applicant</option>
                <option value="type">Sort by Type</option>
              </select>

              <button
                onClick={exportToCSV}
                disabled={filteredApplications.length === 0}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaDownload />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading applications...</p>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <FaFileAlt className="mx-auto text-6xl text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No applications found</h3>
            <p className="text-gray-500">
              {applications.length === 0 ? 'No applications assigned yet.' : 'Try adjusting your filters.'}
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-4">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Applicant</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Visa Type</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Applied Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Appointment</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredApplications.map((app) => (
                      <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-semibold text-gray-900">{app.applicant_id?.full_name || '-'}</div>
                            <div className="text-sm text-gray-500">{app.applicant_id?.nationality || '-'}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-700">{app.type_id?.name || '-'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(app.status_id?.name)}`}>
                            {app.status_id?.name || '-'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {app.application_date ? new Date(app.application_date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          }) : '-'}
                        </td>
                        <td className="px-6 py-4 text-gray-600">
                          {app.appointment_date ? new Date(app.appointment_date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'short', 
                            day: 'numeric' 
                          }) : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <Link
                              to={`/applications/${app._id}`}
                              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                            >
                              View
                            </Link>
                            <Link
                              to={`/officer/review/${app._id}`}
                              className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                            >
                              Review
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Results Count */}
            <div className="bg-white rounded-lg shadow-md px-6 py-4">
              <p className="text-sm text-gray-600 text-center">
                Showing <span className="font-semibold text-blue-600">{filteredApplications.length}</span> of{' '}
                <span className="font-semibold text-gray-800">{applications.length}</span> applications
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OfficerDashboard;
