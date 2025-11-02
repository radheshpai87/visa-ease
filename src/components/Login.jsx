import React, { useState, useEffect } from 'react';
import AuthBackground from './AuthBackground';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple, FaEye, FaEyeSlash, FaUserShield, FaHome } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import zxcvbn from 'zxcvbn';

const Login = () => {
  const [formType, setFormType] = useState('login');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'applicant'
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);
  
  const navigate = useNavigate();
  const { login, register, loading, user } = useAuth();

  // Redirect already logged-in users to their dashboards
  useEffect(() => {
    if (user) {
      if (user.role === 'applicant') {
        navigate('/applicant-dashboard');
      } else if (user.role === 'officer') {
        navigate('/officer-dashboard');
      } else if (user.role === 'admin') {
        navigate('/admin-dashboard');
      }
    }
  }, [user, navigate]);

  // Check password strength
  useEffect(() => {
    if (formType === 'register' && formData.password) {
      const result = zxcvbn(formData.password);
      setPasswordStrength(result);
    } else {
      setPasswordStrength(null);
    }
  }, [formData.password, formType]);

  const toggleForm = (type) => {
    setFormType(type);
    setError('');
    setPasswordStrength(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const getPasswordStrengthColor = (score) => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];
    return colors[score] || 'bg-gray-300';
  };

  const getPasswordStrengthText = (score) => {
    const texts = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return texts[score] || '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (formType === 'register') {
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (passwordStrength && passwordStrength.score < 2) {
        setError('Password is too weak. Please choose a stronger password.');
        return;
      }
    }

    try {
      let userData;
      if (formType === 'login') {
        const response = await login({ email: formData.email, password: formData.password });
        userData = response;
      } else {
        // Remove confirmPassword before sending to register
        const registerData = { ...formData };
        delete registerData.confirmPassword;
        const response = await register(registerData);
        userData = response;
      }
      
      // Redirect based on role
      const userRole = userData?.role || formData.role;
      if (userRole === 'applicant') {
        navigate('/applicant-dashboard');
      } else if (userRole === 'officer') {
        navigate('/officer-dashboard');
      } else if (userRole === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    }
  };

  const PlaneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-5 h-5" viewBox="0 0 24 24">
      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </svg>
  );

  const socialIcons = {
    'Google': <FcGoogle className="w-5 h-5" />,
    'Facebook': <FaFacebook className="w-5 h-5 text-blue-600" />,
    'Apple': <FaApple className="w-5 h-5" />
  };

  return (
    <AuthBackground>
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row relative">
        {/* Left Side */}
        <div className="bg-blue-900 text-white p-8 md:w-2/5 flex flex-col justify-between relative">
          <div>
            <div className="flex items-center justify-between mb-4">
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
            <h2 className="text-2xl font-bold mb-2">Welcome to VisaEase</h2>
            <p className="text-gray-200 mb-6">Your trusted partner for global mobility. Apply, track, and manage your visa applications with ease.</p>
            <ul className="text-sm text-gray-100 space-y-2 mb-6">
              <li>✔️ Secure & Fast Application</li>
              <li>✔️ Track Status in Real Time</li>
              <li>✔️ Expert Support for All Users</li>
            </ul>
          </div>
          <div className="mt-8 flex-1 flex items-end">
            <img src="/plane-removebg-preview.png" alt="Plane Illustration" className="w-full max-w-[180px] mx-auto opacity-90" />
          </div>
        </div>
        {/* Right Side */}
        <div className="p-8 md:w-3/5 relative">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {formType === 'login' ? 'Welcome Back' : 'Create Account'}
            </h3>
            <div className="flex space-x-2">
              <button
                type="button"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  formType === 'login' ? 'bg-red-600 text-white' : 'text-gray-500'
                }`}
                onClick={() => toggleForm('login')}
              >
                Login
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  formType === 'register' ? 'bg-red-600 text-white' : 'text-gray-500'
                }`}
                onClick={() => toggleForm('register')}
              >
                Register
              </button>
            </div>
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {formType === 'login' && (
              <>
                <div>
                  <label htmlFor="email-login" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input id="email-login" type="email" name="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="password-login" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input 
                      id="password-login" 
                      type={showPassword ? "text" : "password"} 
                      name="password" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 pr-10" 
                      placeholder="Enter your password" 
                      value={formData.password} 
                      onChange={handleChange} 
                      required 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
              </>
            )}
            {formType === 'register' && (
              <>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                  <input id="username" type="text" name="username" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="Choose a username" value={formData.username} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="email-register" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input id="email-register" type="email" name="email" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input id="phone" type="tel" name="phone" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="+1 (123) 456-7890" value={formData.phone} onChange={handleChange} />
                </div>
                <div>
                  <label htmlFor="password-register" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input 
                      id="password-register" 
                      type={showPassword ? "text" : "password"} 
                      name="password" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 pr-10" 
                      placeholder="Create a password" 
                      value={formData.password} 
                      onChange={handleChange} 
                      required 
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {passwordStrength && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-600">Password Strength:</span>
                        <span className={`font-medium ${
                          passwordStrength.score < 2 ? 'text-red-600' : 
                          passwordStrength.score < 4 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {getPasswordStrengthText(passwordStrength.score)}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength.score)}`}
                          style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                        ></div>
                      </div>
                      {passwordStrength.feedback.suggestions.length > 0 && (
                        <p className="text-xs text-gray-600 mt-1">{passwordStrength.feedback.suggestions[0]}</p>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <label htmlFor="confirm-password-register" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                  <div className="relative">
                    <input 
                      id="confirm-password-register" 
                      type={showConfirmPassword ? "text" : "password"} 
                      name="confirmPassword" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 pr-10" 
                      placeholder="Re-enter your password" 
                      value={formData.confirmPassword} 
                      onChange={handleChange} 
                      required 
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select id="role" name="role" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600" value={formData.role} onChange={handleChange}>
                    <option value="applicant">Visa Applicant</option>
                    <option value="officer">Visa Officer</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Select your role. Admin accounts are created separately.</p>
                </div>
              </>
            )}
            <button type="submit" disabled={loading} className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
              <span>{loading ? (formType === 'login' ? 'Signing in...' : 'Creating Account...') : (formType === 'login' ? 'Sign In' : 'Create Account')}</span>
              {!loading && <PlaneIcon />}
            </button>
          </form>
          <div className="text-center mt-8">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-4 bg-white text-gray-500">Or continue with</span></div>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['Google', 'Facebook', 'Apple'].map((provider) => (
                <div key={provider} className="border rounded-lg p-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors">
                  {socialIcons[provider]}<span>{provider}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              {formType === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button onClick={() => toggleForm(formType === 'login' ? 'register' : 'login')} className="text-red-600 hover:underline font-medium">
                {formType === 'login' ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </AuthBackground>
  );
};

export default Login;
