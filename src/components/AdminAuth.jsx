import React, { useState, useEffect } from 'react';
import { FaUserShield, FaEye, FaEyeSlash, FaLock, FaEnvelope, FaUser, FaPhone, FaKey, FaHome, FaShieldAlt } from 'react-icons/fa';
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
    const texts = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return texts[passwordStrength.score] || 'No Password';
  };

  const ShieldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="w-full min-h-screen relative overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-red-900 flex items-center justify-center px-6 py-12">
      {/* Base dot grid pattern */}
      <div className="absolute inset-0"
           style={{
             backgroundImage: 'radial-gradient(#ffffff 1.5px, transparent 1.5px), radial-gradient(#ffffff 1.5px, transparent 1.5px)',
             backgroundSize: '25px 25px',
             backgroundPosition: '0 0, 12.5px 12.5px',
             opacity: 0.1
           }}
      />
      
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        {/* Top Left Pattern */}
        <div className="absolute top-[5%] left-[10%]">
          <svg className="w-32 h-32" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
            <circle cx="50" cy="50" r="35" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          </svg>
        </div>
        
        {/* Top Right Pattern */}
        <div className="absolute top-[15%] right-[10%]">
          <svg className="w-40 h-40" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          </svg>
        </div>
        
        {/* Bottom Left Pattern */}
        <div className="absolute bottom-[10%] left-[15%]">
          <svg className="w-24 h-24" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="35" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          </svg>
        </div>
        
        {/* Bottom Right Pattern */}
        <div className="absolute bottom-[20%] right-[12%]">
          <svg className="w-28 h-28" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
            <circle cx="50" cy="50" r="30" stroke="#ffffff" strokeWidth="1.5" fill="none" className="opacity-10"/>
          </svg>
        </div>
        
        {/* Shield icons */}
        <div className="absolute top-[40%] left-[5%]">
          <svg className="w-16 h-16 opacity-10" viewBox="0 0 24 24" fill="#ffffff">
            <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
          </svg>
        </div>
        
        <div className="absolute bottom-[35%] right-[8%]">
          <svg className="w-16 h-16 opacity-10 rotate-45" viewBox="0 0 24 24" fill="#ffffff">
            <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      
      {/* Curved lines */}
      {[0, 1, 2].map((_, idx) => (
        <div
          key={idx}
          className={`absolute w-64 h-64 opacity-5 ${
            idx === 0 ? 'bottom-0 left-0' : idx === 1 ? 'top-0 right-0 rotate-180' : 'top-1/4 left-1/4 rotate-45'
          }`}
        >
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,90 Q40,40 90,10" stroke="white" fill="transparent" strokeWidth="2" />
          </svg>
        </div>
      ))}
      
      {/* Main Content */}
      <div className="relative w-full max-w-4xl z-10">
    <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row relative">
        {/* Left Side - Admin Themed */}
        <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-red-900 text-white p-8 md:w-2/5 flex flex-col justify-between relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <img src="/favicon.png" alt="VisaEase Logo" className="w-10 h-10" />
                <span className="text-2xl font-bold tracking-wide">VisaEase</span>
              </div>
              {/* Home Button beside logo */}
              <button
                onClick={() => navigate('/')}
                className="text-white/80 hover:text-white hover:bg-white/10 transition-all p-2 rounded-full"
                title="Go to Homepage"
              >
                <FaHome className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-4">
                <FaUserShield className="text-yellow-300 text-xl" />
                <span className="text-sm font-semibold">Administrator Portal</span>
              </div>
              <h2 className="text-3xl font-bold mb-3">Secure Admin Access</h2>
              <p className="text-purple-100 mb-6">
                Manage the entire VisaEase platform with complete administrative control and oversight.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FaShieldAlt className="text-yellow-300" />
                Admin Privileges
              </h3>
              <ul className="text-sm text-purple-100 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✦</span>
                  <span>Full System Management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✦</span>
                  <span>User & Application Control</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✦</span>
                  <span>Analytics & Audit Logs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-300 mt-0.5">✦</span>
                  <span>Visa Type Configuration</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="relative z-10 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <p className="text-xs text-purple-100 flex items-center gap-2">
                <FaLock className="text-yellow-300" />
                <span>All admin actions are logged and monitored for security</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="p-8 md:w-3/5 relative">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {activeTab === 'login' ? 'Admin Sign In' : 'Create Admin Account'}
            </h3>
            <div className="flex space-x-2">
              <button
                type="button"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'login' 
                    ? 'bg-gradient-to-r from-purple-600 to-red-600 text-white shadow-lg' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => {
                  setActiveTab('login');
                  setError('');
                }}
              >
                Login
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === 'register' 
                    ? 'bg-gradient-to-r from-purple-600 to-red-600 text-white shadow-lg' 
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                onClick={() => {
                  setActiveTab('register');
                  setError('');
                }}
              >
                Register
              </button>
            </div>
          </div>

          {/* Warning Banner */}
          <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-r-xl">
            <div className="flex items-start gap-3">
              <FaUserShield className="text-yellow-600 text-xl mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-yellow-800 text-sm">⚠️ Authorized Access Only</p>
                <p className="text-xs text-yellow-700 mt-1">
                  {activeTab === 'login' 
                    ? 'Only authorized administrators can access this portal.'
                    : 'Valid admin secret key required for registration.'}
                </p>
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded-r-xl mb-6 animate-pulse">
              <p className="font-semibold text-sm">Error</p>
              <p className="text-xs mt-1">{error}</p>
            </div>
          )}

          {/* Login Form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    placeholder="admin@visaease.com"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 rounded-lg font-medium text-white text-base transition-all flex items-center justify-center gap-2 ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg'
                }`}
              >
                <span>{loading ? 'Signing in...' : 'Sign In as Admin'}</span>
                {!loading && <ShieldIcon />}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Don't have an admin account?{' '}
                  <button 
                    type="button" 
                    onClick={() => setActiveTab('register')} 
                    className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* Register Form */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="username"
                      type="text"
                      name="username"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                      placeholder="Choose a username"
                      value={registerData.username}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      name="email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                      placeholder="admin@visaease.com"
                      value={registerData.email}
                      onChange={handleRegisterChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    placeholder="+91 9876543210"
                    value={registerData.phone}
                    onChange={handleRegisterChange}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    placeholder="Create a strong password"
                    value={registerData.password}
                    onChange={handleRegisterChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                
                {/* Password Strength Indicator */}
                {registerData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600">Password Strength:</span>
                      <span className={`font-medium ${
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
                      <p className="text-xs text-gray-600 mt-1">{passwordStrength.feedback}</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    placeholder="Re-enter your password"
                    value={registerData.confirmPassword}
                    onChange={handleRegisterChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                {registerData.confirmPassword && registerData.password !== registerData.confirmPassword && (
                  <p className="text-red-600 text-xs mt-2">Passwords do not match</p>
                )}
              </div>

              <div className="border-t-2 border-dashed border-gray-300 pt-4 mt-4">
                <label htmlFor="adminSecretKey" className="block text-sm font-medium text-gray-700 mb-2">
                  <FaKey className="inline mr-1 text-purple-600" />
                  Admin Secret Key
                </label>
                <div className="relative">
                  <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    id="adminSecretKey"
                    type={showSecretKey ? 'text' : 'password'}
                    name="adminSecretKey"
                    className="w-full pl-10 pr-12 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all bg-purple-50"
                    placeholder="Enter admin secret key"
                    value={registerData.adminSecretKey}
                    onChange={handleRegisterChange}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowSecretKey(!showSecretKey)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                  >
                    {showSecretKey ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2 flex items-start gap-1">
                  <span>⚠️</span>
                  <span>Contact your system administrator for the admin secret key.</span>
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || passwordStrength.score < 2}
                className={`w-full py-3 rounded-lg font-medium text-white text-base transition-all flex items-center justify-center gap-2 ${
                  loading || passwordStrength.score < 2
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-purple-600 to-red-600 hover:from-purple-700 hover:to-red-700 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg'
                }`}
              >
                <span>{loading ? 'Creating Account...' : 'Create Admin Account'}</span>
                {!loading && <ShieldIcon />}
              </button>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <button 
                    type="button" 
                    onClick={() => setActiveTab('login')} 
                    className="text-purple-600 hover:text-purple-700 font-semibold hover:underline"
                  >
                    Login here
                  </button>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminAuth;
