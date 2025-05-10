import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginRegistration = () => {
  // State for form type: 'login', 'register', or 'forgot-password'
  const [formType, setFormType] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Forgot password states
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState('');
  
  const navigate = useNavigate();
  const { login, register, resetPassword } = useAuth();

  const toggleForm = (type) => {
    setFormType(type);
    setError('');
    setResetSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (formType === 'login') {
        // Handle login
        await login(email, password);
        navigate('/'); // Redirect to home page after successful login
      } else if (formType === 'register') {
        // Handle registration
        await register(name, email, password, phone);
        navigate('/'); // Redirect to home page after successful registration
      } else if (formType === 'forgot-password') {
        // Handle password reset
        // Validate passwords match
        if (newPassword !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }

        await resetPassword(email, newPassword);
        setResetSuccess('Password has been reset successfully. You can now log in with your new password.');
        
        // Reset form fields and show login form after successful reset
        setTimeout(() => {
          setNewPassword('');
          setConfirmPassword('');
          setFormType('login');
        }, 3000);
      }
    } catch (error) {
      setError(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
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
    <div className="min-h-screen bg-blue-900 flex items-center justify-center px-6 py-12 relative overflow-hidden">
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

        {/* Additional Decorative Elements */}
        <div className="absolute top-[40%] left-[5%]">
          <svg className="w-16 h-16 opacity-10" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>

        <div className="absolute bottom-[35%] right-[8%]">
          <svg className="w-16 h-16 opacity-10 rotate-45" viewBox="0 0 24 24" fill="#ffffff">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </div>
      </div>

      {/* Existing curved lines */}
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

      {/* Card */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left Side */}
        <div className="bg-blue-900 text-white p-8 md:w-2/5 flex flex-col justify-between relative">
          <div className="z-10">
            <div className="flex items-center space-x-2 mb-8">
              <div className="bg-red-600 p-2 rounded-md">
                <PlaneIcon />
              </div>
              <span className="text-2xl font-bold">VisaEase</span>
            </div>
            <h2 className="text-3xl font-bold mb-4">Your Global Journey Starts Here</h2>
            <p className="mb-8 opacity-80">Join thousands of students and professionals who've achieved their international dreams with our help.</p>
            <div className="flex gap-4 mb-8">
              {[
                { value: '15+', label: 'Years' },
                { value: '50+', label: 'Countries' },
                { value: '10k+', label: 'Clients' },
              ].map((item, idx) => (
                <div key={idx} className="bg-blue-800 p-3 h-16 w-16 rounded-lg flex flex-col items-center justify-center text-xs">
                  <span className="font-bold text-lg">{item.value}</span>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-8 right-8 opacity-20">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="white">
              <path d="M22 16.5H8c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1zM16.94 2c-.3 0-.59.13-.79.33l-1.66 1.66c-.29.29-.29.77 0 1.06.29.29.77.29 1.06 0l.72-.72 3.5 3.5-9.74 9.74c-.29.29-.29.77 0 1.06.15.15.34.22.53.22s.38-.07.53-.22l9.74-9.74 3.5 3.5-.72.72c-.29.29-.29.77 0 1.06.15.15.34.22.53.22s.38-.07.53-.22l1.66-1.66c.29-.29.29-.77 0-1.06l-8.07-8.07c-.2-.2-.49-.33-.79-.33z" />
            </svg>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:w-3/5 relative">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800">
              {formType === 'login' ? 'Welcome Back' : 
               formType === 'register' ? 'Create Account' : 
               'Reset Password'}
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

          {/* Reset success message */}
          {resetSuccess && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg mb-4">
              {resetSuccess}
            </div>
          )}

          {/* Display error message if any */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* LOGIN FORM */}
            {formType === 'login' && (
              <>
                <div>
                  <label htmlFor="email-login" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email-login"
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password-login" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password-login"
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <label className="flex items-center text-gray-600">
                    <input type="checkbox" className="h-4 w-4 text-red-600" />
                    <span className="ml-2">Remember me</span>
                  </label>
                  <button 
                    type="button"
                    className="text-red-600 hover:underline"
                    onClick={() => toggleForm('forgot-password')}
                  >
                    Forgot password?
                  </button>
                </div>
              </>
            )}

            {/* REGISTER FORM */}
            {formType === 'register' && (
              <>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email-register" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email-register"
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="+1 (123) 456-7890"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password-register" className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    id="password-register"
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            {/* FORGOT PASSWORD FORM */}
            {formType === 'forgot-password' && (
              <>
                <div>
                  <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="forgot-email"
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    id="new-password"
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Create a new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <span>
                {formType === 'login' 
                  ? (loading ? 'Signing in...' : 'Sign In') 
                  : formType === 'register'
                    ? (loading ? 'Creating Account...' : 'Create Account')
                    : (loading ? 'Resetting Password...' : 'Reset Password')}
              </span>
              {!loading && <PlaneIcon />}
            </button>
          </form>

          {/* Back to Login link (only for forgot password) */}
          {formType === 'forgot-password' && (
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Remember your password?{' '}
                <button 
                  onClick={() => toggleForm('login')} 
                  className="text-red-600 hover:underline font-medium"
                >
                  Back to login
                </button>
              </p>
            </div>
          )}

          {/* Social Logins (only for login and register) */}
          {formType !== 'forgot-password' && (
            <div className="text-center mt-8">
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {['Google', 'Facebook', 'Apple'].map((provider, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-3 flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    {socialIcons[provider]}
                    <span>{provider}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Toggle between login/register (not shown for forgot password) */}
          {formType !== 'forgot-password' && (
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                {formType === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
                <button 
                  onClick={() => toggleForm(formType === 'login' ? 'register' : 'login')} 
                  className="text-red-600 hover:underline font-medium"
                >
                  {formType === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginRegistration;
