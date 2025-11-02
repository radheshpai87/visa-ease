import React, { useState, useEffect } from 'react';
import { FaUserShield, FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUser, FaPhone, FaKey } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from '../api/axios';
import zxcvbn from 'zxcvbn';
import { useAuth } from '../context/AuthContext';

const AdminAuth = () => {
  const { user, login } = useAuth();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    adminSecretKey: ''
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSecretKey, setShowSecretKey] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' });
  
  const navigate = useNavigate();

  // Redirect if user is already logged in as admin
  useEffect(() => {
    if (user && user.role === 'admin') {
      navigate('/admin-dashboard', { replace: true });
    }
  }, [user, navigate]);

  // Password strength evaluation
  const evaluatePasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength({ score: 0, feedback: '' });
      return;
    }
    const result = zxcvbn(password);
    const feedback = result.feedback.suggestions.join(' ') || 
                    ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'][result.score];
    setPasswordStrength({ score: result.score, feedback });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
    
    // Evaluate password strength for register form
    if (name === 'password') {
      evaluatePasswordStrength(value);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!loginData.email || !loginData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      // Use AuthContext login function to properly update user state
      const userData = await login(loginData);
      
      // Check if user is admin
      if (userData.role !== 'admin') {
        setError('Access denied. Admin credentials required.');
        toast.error('Access denied. This page is for administrators only.');
        setLoading(false);
        return;
      }

      toast.success('Admin login successful!');
      navigate('/admin-dashboard', { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!registerData.username || !registerData.email || !registerData.password || 
        !registerData.confirmPassword || !registerData.adminSecretKey) {
      setError('Please fill in all required fields');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength.score < 2) {
      setError('Password is too weak. Please use a stronger password.');
      return;
    }

    setLoading(true);

    try {
      // Register admin user
      const { data } = await axios.post('/auth/admin-register', registerData);
      
      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast.success('Admin account created successfully!');
      
      // Use window.location to force a full page reload and re-initialize auth context
      window.location.href = '/admin-dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please check your secret key.');
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500'];
    return colors[passwordStrength.score] || 'bg-gray-300';
  };

  const getPasswordStrengthText = () => {
    const texts = ['Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'];
    return texts[passwordStrength.score] || 'No Password';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-4xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-purple-700 p-8 text-white">
          <div className="flex items-center justify-center gap-3 mb-3">
            <FaUserShield className="text-5xl" />
            <h2 className="text-4xl font-bold">Admin Portal</h2>
          </div>
          <p className="text-center text-red-100 text-lg">Secure Administrator Access</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => {
              setActiveTab('login');
              setError('');
            }}
            className={`flex-1 py-4 text-lg font-semibold transition-all ${
              activeTab === 'login'
                ? 'text-red-600 border-b-4 border-red-600 bg-red-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FaLock className="inline mr-2" />
            Admin Login
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setError('');
            }}
            className={`flex-1 py-4 text-lg font-semibold transition-all ${
              activeTab === 'register'
                ? 'text-red-600 border-b-4 border-red-600 bg-red-50'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            <FaUserShield className="inline mr-2" />
            Admin Register
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Warning Banner */}
          <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg">
            <div className="flex items-start">
              <FaUserShield className="text-yellow-600 text-xl mr-3 mt-1" />
              <div>
                <p className="font-semibold text-yellow-800">⚠️ Administrator Access Only</p>
                <p className="text-sm text-yellow-700 mt-1">
                  {activeTab === 'login' 
                    ? 'Only authorized administrators can access this portal.'
                    : 'You must have a valid admin secret key to create an administrator account.'}
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r-lg mb-6">
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="login-email" className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaEnvelope className="inline mr-2 text-red-600" />
                  Admin Email Address
                </label>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                  placeholder="admin@visaease.com"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaLock className="inline mr-2 text-red-600" />
                  Password
                </label>
                <div className="relative">
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all pr-12"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-lg font-semibold text-white text-lg transition-all ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transform hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Logging in...
                  </span>
                ) : (
                  'Login as Admin'
                )}
              </button>

              <div className="text-center text-sm text-gray-600">
                <p>Don't have an admin account? <button type="button" onClick={() => setActiveTab('register')} className="text-red-600 hover:text-red-700 font-semibold">Register here</button></p>
              </div>
            </form>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaUser className="inline mr-2 text-red-600" />
                    Username *
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                    placeholder="Choose a username"
                    value={registerData.username}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    <FaEnvelope className="inline mr-2 text-red-600" />
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                    placeholder="admin@visaease.com"
                    value={registerData.email}
                    onChange={handleRegisterChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaPhone className="inline mr-2 text-red-600" />
                  Phone Number (Optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all"
                  placeholder="+91 9876543210"
                  value={registerData.phone}
                  onChange={handleRegisterChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaLock className="inline mr-2 text-red-600" />
                  Password *
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all pr-12"
                    placeholder="Create a strong password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {registerData.password && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Password Strength:</span>
                      <span className={`text-sm font-semibold ${
                        passwordStrength.score < 2 ? 'text-red-600' : 
                        passwordStrength.score < 4 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                        style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                      />
                    </div>
                    {passwordStrength.feedback && (
                      <p className="text-xs text-gray-600 mt-2">{passwordStrength.feedback}</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaLock className="inline mr-2 text-red-600" />
                  Confirm Password *
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all pr-12"
                    placeholder="Re-enter your password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                {registerData.confirmPassword && registerData.password !== registerData.confirmPassword && (
                  <p className="text-red-600 text-sm mt-2">Passwords do not match</p>
                )}
              </div>

              <div className="border-t-2 border-dashed border-gray-300 pt-5">
                <label htmlFor="adminSecretKey" className="block text-sm font-semibold text-gray-700 mb-2">
                  <FaKey className="inline mr-2 text-red-600" />
                  Admin Secret Key *
                </label>
                <div className="relative">
                  <input
                    id="adminSecretKey"
                    type={showSecretKey ? 'text' : 'password'}
                    name="adminSecretKey"
                    className="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent transition-all pr-12 bg-red-50"
                    placeholder="Enter admin secret key"
                    value={registerData.adminSecretKey}
                    onChange={handleRegisterChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecretKey(!showSecretKey)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600 transition-colors"
                  >
                    {showSecretKey ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  ⚠️ This key is required to create an administrator account. Contact your system administrator for access.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || passwordStrength.score < 2}
                className={`w-full py-4 rounded-lg font-semibold text-white text-lg transition-all ${
                  loading || passwordStrength.score < 2
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 transform hover:scale-[1.02] active:scale-[0.98]'
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Admin Account'
                )}
              </button>

              <div className="text-center text-sm text-gray-600">
                <p>Already have an account? <button type="button" onClick={() => setActiveTab('login')} className="text-red-600 hover:text-red-700 font-semibold">Login here</button></p>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-200">
          <p className="text-center text-xs text-gray-600">
            🔒 Secure Connection • All administrator actions are logged for security purposes
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
