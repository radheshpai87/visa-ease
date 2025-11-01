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
  FaEdit, FaTrash, FaSearch, FaPlus, FaTimes, FaSignOutAlt 
} from 'react-icons/fa';

const AdminDashboard = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [statistics, setStatistics] = useState(null);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview'); // overview, users, audit
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

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
      const [statsRes, usersRes, auditRes] = await Promise.all([
        axios.get('/api/admin/statistics'),
        axios.get('/api/admin/users'),
        axios.get('/api/admin/audit-logs')
      ]);
      
      setStatistics(statsRes.data);
      setUsers(Array.isArray(usersRes.data) ? usersRes.data : []);
      setAuditLogs(Array.isArray(auditRes.data) ? auditRes.data : []);
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
      await axios.delete(`/api/admin/users/${id}`);
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
      await axios.put(`/api/admin/users/${editingUser._id}`, {
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

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-purple-100">Manage users, view analytics, and monitor system activity</p>
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
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === 'overview'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              📊 Overview & Analytics
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === 'users'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              👥 User Management
            </button>
            <button
              onClick={() => setActiveTab('audit')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors ${
                activeTab === 'audit'
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-purple-600'
              }`}
            >
              📝 Audit Logs
            </button>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
            <p className="text-gray-600">Loading dashboard data...</p>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && statistics && (
              <div className="space-y-8">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Users</p>
                        <p className="text-3xl font-bold text-gray-800">{statistics.totalUsers || 0}</p>
                      </div>
                      <FaUsers className="text-4xl text-blue-600 opacity-20" />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-600 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Applications</p>
                        <p className="text-3xl font-bold text-gray-800">{statistics.totalApplications || 0}</p>
                      </div>
                      <FaFileAlt className="text-4xl text-purple-600 opacity-20" />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Pending Approvals</p>
                        <p className="text-3xl font-bold text-yellow-600">{statistics.pendingApprovals || 0}</p>
                      </div>
                      <FaCheckCircle className="text-4xl text-yellow-500 opacity-20" />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Applicants</p>
                        <p className="text-3xl font-bold text-green-600">{statistics.totalApplicants || 0}</p>
                      </div>
                      <FaUserTie className="text-4xl text-green-500 opacity-20" />
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Total Officers</p>
                        <p className="text-3xl font-bold text-indigo-600">{statistics.totalOfficers || 0}</p>
                      </div>
                      <FaUserShield className="text-4xl text-indigo-500 opacity-20" />
                    </div>
                  </div>
                </div>

                {/* Charts Row 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Monthly Applications Line Chart */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Applications per Month</h3>
                    {monthlyData.length > 0 ? (
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={monthlyData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="count" 
                            stroke="#9333EA" 
                            strokeWidth={2}
                            name="Applications"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-64 flex items-center justify-center text-gray-500">
                        No monthly data available
                      </div>
                    )}
                  </div>

                  {/* Status Distribution Pie Chart */}
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Application Status Distribution</h3>
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
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-64 flex items-center justify-center text-gray-500">
                        No status data available
                      </div>
                    )}
                  </div>
                </div>

                {/* Applications by Visa Type Bar Chart */}
                {statistics.applicationsByType && statistics.applicationsByType.length > 0 && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Applications by Visa Type</h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={statistics.applicationsByType}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="type" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#9333EA" name="Applications" />
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
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                    <div className="flex-1 w-full lg:w-auto">
                      <div className="relative">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search by username or email..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 w-full lg:w-auto">
                      <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      >
                        <option value="all">All Roles</option>
                        <option value="applicant">Applicants</option>
                        <option value="officer">Officers</option>
                        <option value="admin">Admins</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Users Table */}
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-gradient-to-r from-purple-600 to-purple-700 text-white">
                        <tr>
                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Username</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Email</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Phone</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Role</th>
                          <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.length === 0 ? (
                          <tr>
                            <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                              <FaUsers className="mx-auto text-6xl text-gray-300 mb-4" />
                              <p>No users found</p>
                            </td>
                          </tr>
                        ) : (
                          filteredUsers.map((user) => (
                            <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 font-semibold text-gray-900">{user.username}</td>
                              <td className="px-6 py-4 text-gray-700">{user.email}</td>
                              <td className="px-6 py-4 text-gray-700">{user.phone || '-'}</td>
                              <td className="px-6 py-4">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                  user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                                  user.role === 'officer' ? 'bg-blue-100 text-blue-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {user.role}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleEditUser(user)}
                                    className="inline-flex items-center gap-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                  >
                                    <FaEdit /> Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteUser(user._id)}
                                    className="inline-flex items-center gap-1 bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                                  >
                                    <FaTrash /> Delete
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
                <div className="bg-white rounded-lg shadow-md px-6 py-4">
                  <p className="text-sm text-gray-600 text-center">
                    Showing <span className="font-semibold text-purple-600">{filteredUsers.length}</span> of{' '}
                    <span className="font-semibold text-gray-800">{users.length}</span> users
                  </p>
                </div>
              </div>
            )}

            {/* Audit Logs Tab */}
            {activeTab === 'audit' && (
              <div className="space-y-6">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {auditLogs.length === 0 ? (
                      <div className="px-6 py-12 text-center text-gray-500">
                        <p>No audit logs available</p>
                      </div>
                    ) : (
                      auditLogs.map((log, index) => (
                        <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 mt-1">
                              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                                <FaUserShield className="text-purple-600" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900">
                                {log.action || 'User activity'}
                              </p>
                              <p className="text-sm text-gray-500">
                                {log.username} • {log.email}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {log.created_at ? new Date(log.created_at).toLocaleString() : 'Recent'}
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
    </div>
  );
};

export default AdminDashboard;