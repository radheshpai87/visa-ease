import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaFileAlt, FaClock, FaCheckCircle, FaTimesCircle, FaSearch, FaDownload, FaSignOutAlt, FaUser, FaClipboardCheck, FaChartLine } from 'react-icons/fa';
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
      'Application Date': new Date(app.application_date).toLocaleDateString('en-IN'),
      'Appointment Date': app.appointment_date ? new Date(app.appointment_date).toLocaleDateString('en-IN') : '-',
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: 'radial-gradient(circle at 2px 2px, #2563eb 1px, transparent 0)',
               backgroundSize: '40px 40px'
             }}
        />
      </div>

      {/* Header with Gradient */}
      <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white py-12 px-6 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
                Officer Dashboard
              </h1>
              <p className="text-blue-100 text-lg">Review and process assigned visa applications with care</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/profile')}
                className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105 shadow-lg"
              >
                <FaUser className="text-lg group-hover:rotate-12 transition-transform" />
                <span className="font-semibold">Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/40 hover:scale-105 shadow-lg"
              >
                <FaSignOutAlt className="text-lg group-hover:translate-x-1 transition-transform" />
                <span className="font-semibold">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10 relative z-10">
        {/* Statistics Cards */}
        {loading && !statistics ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : statistics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
            {/* Total Assigned */}
            <div className="group relative bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <FaFileAlt className="text-4xl text-white/80" />
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <FaChartLine className="text-white text-sm" />
                  </div>
                </div>
                <p className="text-sm text-blue-100 mb-2 font-medium">Total Assigned</p>
                <p className="text-4xl font-bold text-white">{statistics.totalAssigned}</p>
              </div>
            </div>

            {/* Pending Review */}
            <div className="group relative bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <FaClock className="text-4xl text-white/80" />
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs text-white font-bold">⏳</span>
                  </div>
                </div>
                <p className="text-sm text-yellow-100 mb-2 font-medium">Pending Review</p>
                <p className="text-4xl font-bold text-white">{statistics.pendingCount}</p>
              </div>
            </div>

            {/* In Review */}
            <div className="group relative bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <FaClipboardCheck className="text-4xl text-white/80" />
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs text-white font-bold">📋</span>
                  </div>
                </div>
                <p className="text-sm text-purple-100 mb-2 font-medium">In Review</p>
                <p className="text-4xl font-bold text-white">{statistics.inReviewCount}</p>
              </div>
            </div>

            {/* Approved */}
            <div className="group relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <FaCheckCircle className="text-4xl text-white/80" />
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs text-white font-bold">✓</span>
                  </div>
                </div>
                <p className="text-sm text-green-100 mb-2 font-medium">Approved</p>
                <p className="text-4xl font-bold text-white">{statistics.approvedCount}</p>
              </div>
            </div>

            {/* Rejected */}
            <div className="group relative bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <FaTimesCircle className="text-4xl text-white/80" />
                  <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs text-white font-bold">✕</span>
                  </div>
                </div>
                <p className="text-sm text-red-100 mb-2 font-medium">Rejected</p>
                <p className="text-4xl font-bold text-white">{statistics.rejectedCount}</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions Bar */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-10 border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full lg:w-auto">
              <div className="relative group">
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                <input
                  type="text"
                  placeholder="Search by applicant name, visa type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white shadow-sm"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-3 w-full lg:w-auto">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white shadow-sm transition-all font-medium"
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
                className="px-5 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white shadow-sm transition-all font-medium"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="applicant">Sort by Applicant</option>
                <option value="type">Sort by Type</option>
              </select>

              <button
                onClick={exportToCSV}
                disabled={filteredApplications.length === 0}
                className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center gap-2 whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105"
              >
                <FaDownload className="group-hover:translate-y-1 transition-transform" />
                Export CSV
              </button>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        ) : filteredApplications.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-gray-100">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-6">
              <FaFileAlt className="text-5xl text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Applications Found</h3>
            <p className="text-gray-600 mb-4 max-w-md mx-auto">
              {applications.length === 0 ? 'No applications assigned yet. New applications will appear here.' : 'Try adjusting your search filters to find what you\'re looking for.'}
            </p>
          </div>
        ) : (
          <>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-gray-100 mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Applicant</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Visa Type</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Applied Date</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Appointment</th>
                      <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/50 divide-y divide-gray-200">
                    {filteredApplications.map((app, index) => (
                      <tr key={app._id} className="hover:bg-white/80 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-bold text-gray-900">{app.applicant_id?.full_name || '-'}</div>
                              <div className="text-sm text-gray-500">{app.applicant_id?.nationality || '-'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="font-semibold text-gray-900">{app.type_id?.name || '-'}</span>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`px-4 py-2 text-xs font-bold rounded-full border-2 ${getStatusColor(app.status_id?.name)} shadow-sm`}>
                            {app.status_id?.name || '-'}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-sm font-medium text-gray-900">
                            {app.application_date ? new Date(app.application_date).toLocaleDateString('en-IN', { 
                              day: '2-digit',
                              month: '2-digit', 
                              year: 'numeric'
                            }) : '-'}
                          </div>
                          <div className="text-xs text-gray-500">
                            {app.application_date ? new Date(app.application_date).toLocaleTimeString('en-IN', { 
                              hour: '2-digit', 
                              minute: '2-digit',
                              hour12: true
                            }) : ''}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-sm font-medium text-gray-900">
                            {app.appointment_date ? new Date(app.appointment_date).toLocaleDateString('en-IN', { 
                              day: '2-digit',
                              month: '2-digit', 
                              year: 'numeric'
                            }) : (
                              <span className="text-gray-400">Not scheduled</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex gap-2">
                            <Link
                              to={`/applications/${app._id}`}
                              className="group-hover:scale-105 transition-transform inline-flex items-center gap-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2.5 rounded-xl hover:from-purple-700 hover:to-pink-700 font-semibold shadow-md hover:shadow-lg text-sm"
                            >
                              View & Review
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
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl px-6 py-4 border border-gray-100 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-xs font-bold">
                  {filteredApplications.length}
                </span>
                Showing <span className="font-bold text-blue-600">{filteredApplications.length}</span> of <span className="font-bold">{applications.length}</span> applications
              </p>
              {filteredApplications.length < applications.length && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 transition-colors"
                >
                  Clear filters
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OfficerDashboard;
