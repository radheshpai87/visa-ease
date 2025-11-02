import React, { useEffect, useState } from 'react';
import axios from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  FaUsers, FaFileAlt, FaCheckCircle, FaUserTie, FaUserShield,
  FaEdit, FaTrash, FaSearch, FaPlus, FaTimes, FaSignOutAlt, FaUser,
  FaClipboardList, FaPassport, FaFile, FaEye, FaCalendarAlt
} from 'react-icons/fa';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  // Data State
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [visaTypes, setVisaTypes] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // UI State
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Modal State
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showVisaTypeModal, setShowVisaTypeModal] = useState(false);
  const [editingVisaType, setEditingVisaType] = useState(null);
  
  // Form State
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'applicant',
    phone: ''
  });
  
  const [newVisaType, setNewVisaType] = useState({
    name: '',
    fee: '',
    duration_days: '',
    required_docs_list: []
  });

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/');
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, auditRes, appsRes, visaTypesRes, docsRes] = await Promise.all([
        axios.get('/admin/statistics'),
        axios.get('/admin/users'),
        axios.get('/admin/audit-logs'),
        axios.get('/admin/applications'),
        axios.get('/admin/visa-types'),
        axios.get('/admin/documents')
      ]);
      
      setStatistics(statsRes.data);
      setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
      setAuditLogs(Array.isArray(auditRes.data) ? auditRes.data : []);
      setApplications(Array.isArray(appsRes.data) ? appsRes.data : []);
      setVisaTypes(Array.isArray(visaTypesRes.data) ? visaTypesRes.data : []);
      setDocuments(Array.isArray(docsRes.data) ? docsRes.data : []);
    } catch (error) {
      console.error('Failed to load admin data:', error);
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      await axios.delete(`/admin/users/${id}`);
      setUsers(users.filter(u => u._id !== id));
      toast.success('User deleted successfully');
      fetchData(); // Refresh audit logs
    } catch {
      toast.error('Failed to delete user');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser({ ...user });
    setShowEditModal(true);
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put(`/admin/users/${editingUser._id}`, {
        username: editingUser.username,
        email: editingUser.email,
        role: editingUser.role,
        phone: editingUser.phone
      });
      
      setUsers(users.map(u => u._id === editingUser._id ? editingUser : u));
      setShowEditModal(false);
      setEditingUser(null);
      toast.success('User updated successfully');
      fetchData(); // Refresh data
    } catch {
      toast.error('Failed to update user');
    }
  };

  // User Creation
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/admin/users', newUser);
      toast.success('User created successfully');
      setShowCreateUserModal(false);
      setNewUser({ username: '', email: '', password: '', role: 'applicant', phone: '' });
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create user');
    }
  };

  // Application Management
  const handleDeleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application and all its documents?')) return;
    try {
      await axios.delete(`/admin/applications/${id}`);
      toast.success('Application deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete application');
    }
  };

  const handleViewApplication = (id) => {
    navigate(`/applications/${id}`);
  };

  // Visa Type Management
  const handleCreateVisaType = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/admin/visa-types', {
        ...newVisaType,
        required_docs_list: newVisaType.required_docs_list.filter(d => d.trim() !== '')
      });
      toast.success('Visa type created successfully');
      setShowVisaTypeModal(false);
      setNewVisaType({ name: '', fee: '', duration_days: '', required_docs_list: [] });
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create visa type');
    }
  };

  const handleEditVisaType = (visaType) => {
    setEditingVisaType({ ...visaType });
    setShowVisaTypeModal(true);
  };

  const handleUpdateVisaType = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/admin/visa-types/${editingVisaType._id}`, editingVisaType);
      toast.success('Visa type updated successfully');
      setShowVisaTypeModal(false);
      setEditingVisaType(null);
      fetchData();
    } catch (error) {
      toast.error('Failed to update visa type');
    }
  };

  const handleDeleteVisaType = async (id) => {
    if (!window.confirm('Are you sure you want to delete this visa type?')) return;
    try {
      await axios.delete(`/admin/visa-types/${id}`);
      toast.success('Visa type deleted successfully');
      fetchData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete visa type');
    }
  };

  // Document Management
  const handleDeleteDocument = async (id) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;
    try {
      await axios.delete(`/admin/documents/${id}`);
      toast.success('Document deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete document');
    }
  };

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Filter applications
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicant_id?.passport_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.applicant_id?.first_name?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || app.status_id?.name === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Prepare chart data
  const statusPieData = statistics ? [
    { name: 'Pending', value: statistics.statusCounts?.pending || 0, color: '#EAB308' },
    { name: 'In Review', value: statistics.statusCounts?.inReview || 0, color: '#3B82F6' },
    { name: 'Approved', value: statistics.statusCounts?.approved || 0, color: '#10B981' },
    { name: 'Rejected', value: statistics.statusCounts?.rejected || 0, color: '#EF4444' },
    { name: 'More Info', value: statistics.statusCounts?.moreInfo || 0, color: '#A855F7' }
  ] : [];

  const monthlyData = statistics?.monthlyApplications || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
      {/* Animated Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: 'radial-gradient(circle at 2px 2px, #9333ea 1px, transparent 0)',
               backgroundSize: '40px 40px'
             }}
        />
      </div>

      {/* Header with Gradient */}
      <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white py-12 px-6 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100 flex items-center gap-3 justify-center lg:justify-start">
                <FaUserShield className="text-white text-4xl" />
                Admin Control Panel
              </h1>
              <p className="text-purple-100 text-lg">Complete system management and oversight with advanced analytics</p>
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
        {/* Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl mb-10 overflow-hidden border border-gray-100">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              onClick={() => { setActiveTab('overview'); setSearchTerm(''); setRoleFilter('all'); setStatusFilter('all'); }}
              className={`flex-1 py-5 px-6 text-center font-bold transition-all whitespace-nowrap min-w-fit ${
                activeTab === 'overview'
                  ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              📊 Overview & Analytics
            </button>
            <button
              onClick={() => { setActiveTab('users'); setSearchTerm(''); setRoleFilter('all'); setStatusFilter('all'); }}
              className={`flex-1 py-5 px-6 text-center font-bold transition-all whitespace-nowrap min-w-fit ${
                activeTab === 'users'
                  ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              👥 User Management
            </button>
            <button
              onClick={() => { setActiveTab('applications'); setSearchTerm(''); setRoleFilter('all'); setStatusFilter('all'); }}
              className={`flex-1 py-5 px-6 text-center font-bold transition-all whitespace-nowrap min-w-fit ${
                activeTab === 'applications'
                  ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              📄 Applications
            </button>
            <button
              onClick={() => { setActiveTab('visa-types'); setSearchTerm(''); setRoleFilter('all'); setStatusFilter('all'); }}
              className={`flex-1 py-5 px-6 text-center font-bold transition-all whitespace-nowrap min-w-fit ${
                activeTab === 'visa-types'
                  ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              🛂 Visa Types
            </button>
            <button
              onClick={() => { setActiveTab('documents'); setSearchTerm(''); setRoleFilter('all'); setStatusFilter('all'); }}
              className={`flex-1 py-5 px-6 text-center font-bold transition-all whitespace-nowrap min-w-fit ${
                activeTab === 'documents'
                  ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              📁 Documents
            </button>
            <button
              onClick={() => { setActiveTab('audit'); setSearchTerm(''); setRoleFilter('all'); setStatusFilter('all'); }}
              className={`flex-1 py-5 px-6 text-center font-bold transition-all whitespace-nowrap min-w-fit ${
                activeTab === 'audit'
                  ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
              }`}
            >
              📝 Audit Logs
            </button>
          </div>
        </div>

        {loading ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-12 text-center border border-gray-100">
            <div className="relative inline-flex">
              <div className="w-16 h-16 border-4 border-purple-200 rounded-full animate-spin border-t-purple-600"></div>
              <div className="w-16 h-16 border-4 border-pink-200 rounded-full animate-spin border-t-pink-600 absolute top-0 left-0" style={{ animationDirection: 'reverse' }}></div>
            </div>
            <p className="text-gray-700 font-semibold mt-6 text-lg">Loading dashboard data...</p>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && statistics && (
              <div className="space-y-8">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {/* Total Users Card */}
                  <div className="relative bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 rounded-2xl shadow-xl p-6 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <FaUsers className="text-4xl opacity-80" />
                        <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Active</span>
                      </div>
                      <p className="text-purple-100 text-sm mb-1 font-medium">Total Users</p>
                      <p className="text-4xl font-bold">{statistics.totalUsers || 0}</p>
                    </div>
                  </div>

                  {/* Total Applications Card */}
                  <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-xl p-6 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <FaFileAlt className="text-4xl opacity-80" />
                        <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">All Time</span>
                      </div>
                      <p className="text-blue-100 text-sm mb-1 font-medium">Total Applications</p>
                      <p className="text-4xl font-bold">{statistics.totalApplications || 0}</p>
                    </div>
                  </div>

                  {/* Pending Approvals Card */}
                  <div className="relative bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 rounded-2xl shadow-xl p-6 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <FaCheckCircle className="text-4xl opacity-80" />
                        <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm animate-pulse">Urgent</span>
                      </div>
                      <p className="text-yellow-100 text-sm mb-1 font-medium">Pending Approvals</p>
                      <p className="text-4xl font-bold">{statistics.pendingApprovals || 0}</p>
                    </div>
                  </div>

                  {/* Total Applicants Card */}
                  <div className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 rounded-2xl shadow-xl p-6 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <FaUserTie className="text-4xl opacity-80" />
                        <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Clients</span>
                      </div>
                      <p className="text-green-100 text-sm mb-1 font-medium">Total Applicants</p>
                      <p className="text-4xl font-bold">{statistics.totalApplicants || 0}</p>
                    </div>
                  </div>

                  {/* Total Officers Card */}
                  <div className="relative bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-600 rounded-2xl shadow-xl p-6 text-white overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:scale-105">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-3">
                        <FaUserShield className="text-4xl opacity-80" />
                        <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">Staff</span>
                      </div>
                      <p className="text-indigo-100 text-sm mb-1 font-medium">Total Officers</p>
                      <p className="text-4xl font-bold">{statistics.totalOfficers || 0}</p>
                    </div>
                  </div>
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Monthly Applications Line Chart */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">Applications per Month</h3>
                    {monthlyData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="month" stroke="#6b7280" />
                          <YAxis stroke="#6b7280" />
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              border: '1px solid #e5e7eb',
                              borderRadius: '12px',
                              padding: '12px'
                            }}
                          />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="count" 
                            stroke="#9333EA" 
                            strokeWidth={3}
                            name="Applications"
                            dot={{ fill: '#9333EA', r: 5 }}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-64 flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <FaFileAlt className="text-5xl text-gray-300 mx-auto mb-3" />
                          <p>No monthly data available</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Status Distribution Pie Chart */}
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">Application Status Distribution</h3>
                    {statusPieData.some(d => d.value > 0) ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={statusPieData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {statusPieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip 
                            contentStyle={{
                              backgroundColor: 'rgba(255, 255, 255, 0.95)',
                              border: '1px solid #e5e7eb',
                              borderRadius: '12px',
                              padding: '12px'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-64 flex items-center justify-center text-gray-500">
                        <div className="text-center">
                          <FaCheckCircle className="text-5xl text-gray-300 mx-auto mb-3" />
                          <p>No status data available</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Applications by Visa Type Bar Chart */}
                {statistics.applicationsByType && statistics.applicationsByType.length > 0 && (
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">Applications by Visa Type</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={statistics.applicationsByType}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="type" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                            border: '1px solid #e5e7eb',
                            borderRadius: '12px',
                            padding: '12px'
                          }}
                        />
                        <Legend />
                        <Bar dataKey="count" fill="url(#colorGradient)" name="Applications" radius={[8, 8, 0, 0]} />
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#9333EA" stopOpacity={1}/>
                            <stop offset="100%" stopColor="#EC4899" stopOpacity={1}/>
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            )}

            {/* User Management Tab */}
            {activeTab === 'users' && (
              <div className="space-y-6">
                {/* Action Bar */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
                  <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="flex-1 w-full lg:w-auto">
                      <div className="relative group">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                        <input
                          type="text"
                          placeholder="Search by username or email..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 w-full lg:w-auto">
                      <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium transition-all"
                      >
                        <option value="all">All Roles</option>
                        <option value="applicant">Applicants</option>
                        <option value="officer">Officers</option>
                        <option value="admin">Admins</option>
                      </select>
                      <button
                        onClick={() => setShowCreateUserModal(true)}
                        className="group inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                      >
                        <FaPlus className="group-hover:rotate-90 transition-transform duration-300" /> Create User
                      </button>
                    </div>
                  </div>
                </div>

                {/* Users Table */}
                <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">#</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Username</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Email</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Phone</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Role</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.length === 0 ? (
                          <tr>
                            <td colSpan="6" className="px-6 py-16 text-center">
                              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-4">
                                <FaUsers className="text-4xl text-purple-600" />
                              </div>
                              <p className="text-gray-600 font-semibold text-lg">No users found</p>
                              <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
                            </td>
                          </tr>
                        ) : (
                          filteredUsers.map((user, index) => (
                            <tr key={user._id} className="hover:bg-purple-50 transition-colors">
                              <td className="px-6 py-4">
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg font-bold text-sm">
                                  {index + 1}
                                </span>
                              </td>
                              <td className="px-6 py-4 font-semibold text-gray-900">{user.username}</td>
                              <td className="px-6 py-4 text-gray-700">{user.email}</td>
                              <td className="px-6 py-4 text-gray-700">{user.phone || '-'}</td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full border-2 ${
                                  user.role === 'admin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                                  user.role === 'officer' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                  'bg-green-50 text-green-700 border-green-200'
                                }`}>
                                  {user.role.toUpperCase()}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleEditUser(user)}
                                    className="group inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                                  >
                                    <FaEdit className="group-hover:rotate-12 transition-transform" /> Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUser(user._id)}
                                    className="group inline-flex items-center gap-1 bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                                  >
                                    <FaTrash className="group-hover:scale-110 transition-transform" /> Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Results Count */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl px-6 py-4 border border-gray-100">
                  <p className="text-sm text-gray-600 text-center">
                    Showing <span className="font-bold text-purple-600 text-lg">{filteredUsers.length}</span> of{' '}
                    <span className="font-bold text-gray-800 text-lg">{users.length}</span> users
                  </p>
                </div>
              </div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
                  <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="flex-1 w-full lg:w-auto">
                      <div className="relative group">
                        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                        <input
                          type="text"
                          placeholder="Search by applicant name or passport..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="px-5 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-medium transition-all"
                    >
                      <option value="all">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="In Review">In Review</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                      <option value="More Info Required">More Info Required</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">#</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Applicant</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Passport</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Visa Type</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Status</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Date</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredApplications.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="px-6 py-16 text-center">
                              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-4">
                                <FaClipboardList className="text-4xl text-purple-600" />
                              </div>
                              <p className="text-gray-600 font-semibold text-lg">No applications found</p>
                              <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
                            </td>
                          </tr>
                        ) : (
                          filteredApplications.map((app, index) => (
                            <tr key={app._id} className="hover:bg-purple-50 transition-colors">
                              <td className="px-6 py-4">
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg font-bold text-sm">
                                  {index + 1}
                                </span>
                              </td>
                              <td className="px-6 py-4 font-semibold text-gray-900">
                                {app.applicant_id?.first_name} {app.applicant_id?.last_name}
                              </td>
                              <td className="px-6 py-4 text-gray-700 font-mono text-sm">{app.applicant_id?.passport_number}</td>
                              <td className="px-6 py-4 text-gray-700 font-medium">{app.type_id?.name}</td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full border-2 ${
                                  app.status_id?.name === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' :
                                  app.status_id?.name === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' :
                                  app.status_id?.name === 'In Review' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                  'bg-yellow-50 text-yellow-700 border-yellow-200'
                                }`}>
                                  {app.status_id?.name || 'Unknown'}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-gray-700 text-sm">
                                {new Date(app.application_date).toLocaleDateString('en-IN')}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleViewApplication(app._id)}
                                    className="group inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                                  >
                                    <FaEye className="group-hover:scale-110 transition-transform" /> View
                                  </button>
                                  <button
                                    onClick={() => handleDeleteApplication(app._id)}
                                    className="group inline-flex items-center gap-1 bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                                  >
                                    <FaTrash className="group-hover:scale-110 transition-transform" /> Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl px-6 py-4 border border-gray-100">
                  <p className="text-sm text-gray-600 text-center">
                    Showing <span className="font-bold text-purple-600 text-lg">{filteredApplications.length}</span> of{' '}
                    <span className="font-bold text-gray-800 text-lg">{applications.length}</span> applications
                  </p>
                </div>
              </div>
            )}

            {/* Visa Types Tab */}
            {activeTab === 'visa-types' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold mb-1">Manage Visa Types</h3>
                    <p className="text-purple-100">Configure available visa categories and requirements</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingVisaType(null);
                      setNewVisaType({ name: '', fee: '', duration_days: '', required_docs_list: [] });
                      setShowVisaTypeModal(true);
                    }}
                    className="group inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 border border-white/30"
                  >
                    <FaPlus className="group-hover:rotate-90 transition-transform duration-300" /> Create Visa Type
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {visaTypes.length === 0 ? (
                    <div className="col-span-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-16 text-center border border-gray-100">
                      <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-6">
                        <FaPassport className="text-5xl text-purple-600" />
                      </div>
                      <p className="text-gray-600 font-semibold text-lg">No visa types available</p>
                      <p className="text-gray-500 text-sm mt-2">Create your first visa type to get started</p>
                    </div>
                  ) : (
                    visaTypes.map((type) => (
                      <div key={type._id} className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-t-4 border-purple-600 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-4">
                            <h4 className="text-xl font-bold text-gray-800">{type.name}</h4>
                            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                              ₹{type.fee.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <FaCalendarAlt className="text-purple-600 text-sm" />
                              </div>
                              <p className="text-sm text-gray-700">
                                <span className="font-semibold">Duration:</span> {type.duration_days} days
                              </p>
                            </div>
                            {type.required_docs_list && type.required_docs_list.length > 0 && (
                              <div>
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <FaFileAlt className="text-blue-600 text-sm" />
                                  </div>
                                  <p className="text-sm font-semibold text-gray-700">Required Documents:</p>
                                </div>
                                <ul className="text-xs text-gray-600 space-y-1 ml-10">
                                  {type.required_docs_list.slice(0, 3).map((doc, idx) => (
                                    <li key={idx} className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                                      {doc}
                                    </li>
                                  ))}
                                  {type.required_docs_list.length > 3 && (
                                    <li className="text-purple-600 font-semibold">+{type.required_docs_list.length - 3} more</li>
                                  )}
                                </ul>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 mt-6">
                            <button
                              onClick={() => handleEditVisaType(type)}
                              className="group flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                            >
                              <FaEdit className="group-hover:rotate-12 transition-transform" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteVisaType(type._id)}
                              className="group flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                            >
                              <FaTrash className="group-hover:scale-110 transition-transform" /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">All System Documents</h3>
                  <p className="text-purple-100">Total Documents: <span className="font-bold bg-white/30 px-3 py-1 rounded-lg">{documents.length}</span></p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">#</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Document Type</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Applicant</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Visa Type</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Upload Date</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Verified</th>
                          <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {documents.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="px-6 py-16 text-center">
                              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-4">
                                <FaFile className="text-4xl text-purple-600" />
                              </div>
                              <p className="text-gray-600 font-semibold text-lg">No documents found</p>
                              <p className="text-gray-500 text-sm mt-2">Documents will appear here once uploaded</p>
                            </td>
                          </tr>
                        ) : (
                          documents.map((doc, index) => (
                            <tr key={doc._id} className="hover:bg-purple-50 transition-colors">
                              <td className="px-6 py-4">
                                <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-lg font-bold text-sm">
                                  {index + 1}
                                </span>
                              </td>
                              <td className="px-6 py-4 font-semibold text-gray-900">{doc.document_type}</td>
                              <td className="px-6 py-4 text-gray-700">
                                {doc.application_id?.applicant_id?.first_name} {doc.application_id?.applicant_id?.last_name}
                              </td>
                              <td className="px-6 py-4 text-gray-700 font-medium">{doc.application_id?.type_id?.name}</td>
                              <td className="px-6 py-4 text-gray-700 text-sm">
                                {new Date(doc.upload_date).toLocaleDateString('en-IN')}
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 text-xs font-bold rounded-full border-2 ${
                                  doc.verified ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                }`}>
                                  {doc.verified ? '✓ Verified' : '⏳ Pending'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <a
                                    href={doc.file_path}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                                  >
                                    <FaEye className="group-hover:scale-110 transition-transform" /> View
                                  </a>
                                  <button
                                    onClick={() => handleDeleteDocument(doc._id)}
                                    className="group inline-flex items-center gap-1 bg-gradient-to-r from-red-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
                                  >
                                    <FaTrash className="group-hover:scale-110 transition-transform" /> Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Audit Logs Tab */}
            {activeTab === 'audit' && (
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">Recent Activity & Audit Logs</h3>
                  <p className="text-purple-100">Track all system actions and user activities</p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                  <div className="divide-y divide-gray-200">
                    {auditLogs.length === 0 ? (
                      <div className="px-6 py-16 text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full mb-4">
                          <FaUserShield className="text-4xl text-purple-600" />
                        </div>
                        <p className="text-gray-600 font-semibold text-lg">No audit logs available</p>
                        <p className="text-gray-500 text-sm mt-2">System activities will be tracked here</p>
                      </div>
                    ) : (
                      auditLogs.map((log, index) => (
                        <div key={index} className="px-6 py-5 hover:bg-purple-50 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                                <FaUserShield className="text-white text-lg" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-base font-bold text-gray-900">
                                {log.action || 'User activity'}
                              </p>
                              <p className="text-sm text-gray-600 font-medium mt-1">
                                {log.username} • <span className="text-gray-500">{log.email}</span>
                              </p>
                              <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                                <FaCalendarAlt className="text-purple-600" />
                                {log.created_at ? new Date(log.created_at).toLocaleString('en-IN', { 
                                  day: '2-digit', 
                                  month: '2-digit', 
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: true
                                }) : 'Recent'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Edit User Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Edit User</h3>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingUser(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="p-6 space-y-4">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Username</label>
                <input
                  type="text"
                  value={editingUser.username}
                  onChange={(e) => setEditingUser({ ...editingUser, username: e.target.value })}
                  className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Phone</label>
                <input
                  type="text"
                  value={editingUser.phone || ''}
                  onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                  className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Role</label>
                <select
                  value={editingUser.role}
                  onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                  className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                >
                  <option value="applicant">Applicant</option>
                  <option value="officer">Officer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingUser(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create User Modal */}
      {showCreateUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Create New User</h3>
              <button
                onClick={() => setShowCreateUserModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-6 space-y-4">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Username *</label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Email *</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Password *</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                  minLength={6}
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Phone</label>
                <input
                  type="text"
                  value={newUser.phone}
                  onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                  className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Role *</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                >
                  <option value="applicant">Applicant</option>
                  <option value="officer">Officer</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Create User
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateUserModal(false)}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Visa Type Modal (Create/Edit) */}
      {showVisaTypeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">
                {editingVisaType ? 'Edit Visa Type' : 'Create Visa Type'}
              </h3>
              <button
                onClick={() => {
                  setShowVisaTypeModal(false);
                  setEditingVisaType(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes size={24} />
              </button>
            </div>

            <form onSubmit={editingVisaType ? handleUpdateVisaType : handleCreateVisaType} className="p-6 space-y-4">
              <div>
                <label className="block mb-2 font-semibold text-gray-700">Visa Type Name *</label>
                <input
                  type="text"
                  value={editingVisaType ? editingVisaType.name : newVisaType.name}
                  onChange={(e) => editingVisaType 
                    ? setEditingVisaType({ ...editingVisaType, name: e.target.value })
                    : setNewVisaType({ ...newVisaType, name: e.target.value })
                  }
                  className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Fee (USD) *</label>
                <input
                  type="number"
                  value={editingVisaType ? editingVisaType.fee : newVisaType.fee}
                  onChange={(e) => editingVisaType
                    ? setEditingVisaType({ ...editingVisaType, fee: e.target.value })
                    : setNewVisaType({ ...newVisaType, fee: e.target.value })
                  }
                  className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Processing Duration (days) *</label>
                <input
                  type="number"
                  value={editingVisaType ? editingVisaType.duration_days : newVisaType.duration_days}
                  onChange={(e) => editingVisaType
                    ? setEditingVisaType({ ...editingVisaType, duration_days: e.target.value })
                    : setNewVisaType({ ...newVisaType, duration_days: e.target.value })
                  }
                  className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block mb-2 font-semibold text-gray-700">Required Documents (comma-separated)</label>
                <textarea
                  value={editingVisaType 
                    ? editingVisaType.required_docs_list.join(', ') 
                    : newVisaType.required_docs_list.join(', ')
                  }
                  onChange={(e) => {
                    const docs = e.target.value.split(',').map(d => d.trim());
                    editingVisaType
                      ? setEditingVisaType({ ...editingVisaType, required_docs_list: docs })
                      : setNewVisaType({ ...newVisaType, required_docs_list: docs });
                  }}
                  className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  rows="3"
                  placeholder="e.g., Passport, Photo, Bank Statement"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  {editingVisaType ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowVisaTypeModal(false);
                    setEditingVisaType(null);
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;