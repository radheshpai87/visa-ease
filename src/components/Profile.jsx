import React, { useState, useEffect } from 'react';
import axios from '../api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, FaLock, FaCamera, FaEye, FaEyeSlash, FaSave, FaTimes, 
  FaArrowLeft, FaEnvelope, FaPhone, FaShieldAlt, FaEdit, FaCheckCircle 
} from 'react-icons/fa';
import zxcvbn from 'zxcvbn';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Profile Information State
  const [profileData, setProfileData] = useState({
    username: '',
    email: '',
    phone: '',
    role: ''
  });

  // Password Change State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: '' });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    console.log('ProfilePicture state changed:', profilePicture);
  }, [profilePicture]);

  useEffect(() => {
    if (passwordData.newPassword) {
      const result = zxcvbn(passwordData.newPassword);
      setPasswordStrength({
        score: result.score,
        feedback: result.feedback.suggestions.join(' ') || 'Password strength evaluated'
      });
    } else {
      setPasswordStrength({ score: 0, feedback: '' });
    }
  }, [passwordData.newPassword]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('/auth/me');
      console.log('Fetched user profile:', response.data);
      setProfileData({
        username: response.data.username || '',
        email: response.data.email || '',
        phone: response.data.phone || '',
        role: response.data.role || ''
      });
      setProfilePicture(response.data.profilePicture || null);
      console.log('Profile picture URL:', response.data.profilePicture);
    } catch (error) {
      console.error('Failed to load profile:', error);
      toast.error('Failed to load profile');
    }
  };

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.put('/auth/update-profile', {
        username: profileData.username,
        email: profileData.email,
        phone: profileData.phone
      });
      toast.success('Profile updated successfully!');
      fetchUserProfile();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordStrength.score < 2) {
      toast.error('Please choose a stronger password');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      await axios.put('/auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      toast.success('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    console.log('=== Profile Picture Upload Started ===');
    console.log('Selected file:', file.name, file.type, file.size);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5242880) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    setUploadingImage(true);

    const formData = new FormData();
    formData.append('profilePicture', file);

    console.log('FormData created, sending request...');

    try {
      const response = await axios.post('/auth/upload-profile-picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('✅ Upload response:', response.data);
      console.log('Profile picture URL:', response.data.profilePicture);
      
      setProfilePicture(response.data.profilePicture);
      toast.success('Profile picture updated!');
      
      // Refetch profile to ensure data is synced with database
      console.log('Refetching user profile...');
      await fetchUserProfile();
      console.log('Profile refetched successfully');
    } catch (error) {
      console.error('❌ Upload error:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.message || 'Failed to upload profile picture');
    } finally {
      setUploadingImage(false);
      console.log('=== Upload Process Complete ===\n');
    }
  };

  const getPasswordStrengthColor = () => {
    const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];
    return colors[passwordStrength.score] || 'bg-gray-300';
  };

  const getPasswordStrengthText = () => {
    const texts = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
    return texts[passwordStrength.score] || 'Very Weak';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group mb-6 flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-all font-medium"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
        </button>
        
        {/* Header with Profile Picture */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-white/50 mb-6">
          {/* Cover Background */}
          <div className="h-32 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 relative">
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

          {/* Profile Content */}
          <div className="relative px-8 pb-8">
            {/* Profile Picture */}
            <div className="absolute -top-16 left-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold shadow-2xl overflow-hidden ring-4 ring-white">
                  {profilePicture ? (
                    <img 
                      src={profilePicture} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                      onLoad={() => console.log('✅ Image loaded successfully:', profilePicture)}
                      onError={(e) => {
                        console.error('❌ Image failed to load:', profilePicture);
                        console.error('Error event:', e);
                      }}
                    />
                  ) : (
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-full h-full flex items-center justify-center">
                      {profileData.username.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                
                {/* Upload Button Overlay */}
                <label
                  htmlFor="profile-upload"
                  className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-2xl flex items-center justify-center"
                >
                  <div className="text-center text-white">
                    <FaCamera className="text-3xl mx-auto mb-1" />
                    <span className="text-xs font-semibold">{uploadingImage ? 'Uploading...' : 'Change Photo'}</span>
                  </div>
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={uploadingImage}
                />
              </div>
            </div>

            {/* User Info */}
            <div className="pt-20 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent mb-2">
                  {profileData.username}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-3">
                  <span className="flex items-center gap-2">
                    <FaEnvelope className="text-purple-500" />
                    {profileData.email}
                  </span>
                  {profileData.phone && (
                    <span className="flex items-center gap-2">
                      <FaPhone className="text-pink-500" />
                      {profileData.phone}
                    </span>
                  )}
                </div>
                <span className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-xl shadow-lg ${
                  profileData.role === 'admin' 
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white' 
                    : profileData.role === 'officer' 
                    ? 'bg-gradient-to-r from-blue-500 to-cyan-600 text-white' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                }`}>
                  <FaShieldAlt />
                  {profileData.role?.toUpperCase()}
                </span>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-3">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 px-6 py-3 rounded-xl border-2 border-purple-200">
                  <p className="text-xs text-gray-600 font-semibold">Member Since</p>
                  <p className="text-lg font-bold text-purple-600">2024</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-red-50 px-6 py-3 rounded-xl border-2 border-pink-200">
                  <p className="text-xs text-gray-600 font-semibold">Status</p>
                  <p className="text-lg font-bold text-pink-600 flex items-center gap-1">
                    <FaCheckCircle className="text-green-500" /> Active
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/80 backdrop-blur-lg rounded-t-2xl shadow-xl border border-white/50 border-b-0">
          <div className="flex">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-4 px-6 text-center font-bold transition-all flex items-center justify-center gap-2 rounded-tl-2xl ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-purple-50'
              }`}
            >
              <FaUser /> Profile Information
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`flex-1 py-4 px-6 text-center font-bold transition-all flex items-center justify-center gap-2 rounded-tr-2xl ${
                activeTab === 'password'
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-purple-50'
              }`}
            >
              <FaLock /> Change Password
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/80 backdrop-blur-lg rounded-b-2xl shadow-2xl p-8 border border-white/50">
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <FaEdit className="text-white" />
                  </div>
                  Edit Profile Information
                </h2>
                <p className="text-gray-600 mt-2">Update your personal details and contact information</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="group">
                  <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                    <FaUser className="text-purple-500" />
                    Username *
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleProfileChange}
                    className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300 bg-white"
                    required
                  />
                </div>

                <div className="group">
                  <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                    <FaEnvelope className="text-pink-500" />
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all hover:border-pink-300 bg-white"
                    required
                  />
                </div>

                <div className="group">
                  <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                    <FaPhone className="text-red-500" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-red-300 bg-white"
                    placeholder="+91 98765 43210"
                  />
                </div>

                <div className="group">
                  <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                    <FaShieldAlt className="text-indigo-500" />
                    Role
                  </label>
                  <input
                    type="text"
                    value={profileData.role}
                    className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 cursor-not-allowed font-semibold text-gray-600"
                    disabled
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-red-50 p-6 rounded-xl border-2 border-purple-200">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <FaCheckCircle className="text-purple-500" />
                  Profile Completion
                </h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white rounded-full h-3 overflow-hidden shadow-inner">
                    <div 
                      className="h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500"
                      style={{ width: `${profileData.phone ? '100%' : '75%'}` }}
                    ></div>
                  </div>
                  <span className="font-bold text-purple-600">{profileData.phone ? '100%' : '75%'}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {profileData.phone 
                    ? 'Your profile is complete! 🎉' 
                    : 'Add your phone number to complete your profile'}
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <FaSave />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg flex items-center justify-center">
                    <FaLock className="text-white" />
                  </div>
                  Change Password
                </h2>
                <p className="text-gray-600 mt-2">Update your password to keep your account secure</p>
              </div>

              <div className="space-y-6">
                {/* Current Password */}
                <div className="group">
                  <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                    <FaLock className="text-purple-500" />
                    Current Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300 pr-12 bg-white"
                      required
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                    >
                      {showPasswords.current ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="group">
                  <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                    <FaLock className="text-pink-500" />
                    New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all hover:border-pink-300 pr-12 bg-white"
                      required
                      placeholder="Enter your new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-pink-600 transition-colors"
                    >
                      {showPasswords.new ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {passwordData.newPassword && (
                    <div className="mt-3 bg-white p-4 rounded-xl border-2 border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-700">Password Strength:</span>
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                          passwordStrength.score < 2 ? 'bg-red-100 text-red-700' :
                          passwordStrength.score < 4 ? 'bg-yellow-100 text-yellow-700' : 
                          'bg-green-100 text-green-700'
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="flex gap-1 mb-2">
                        {[0, 1, 2, 3, 4].map((index) => (
                          <div
                            key={index}
                            className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                              index <= passwordStrength.score ? getPasswordStrengthColor() : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                      {passwordStrength.feedback && (
                        <p className="text-xs text-gray-600 mt-2">{passwordStrength.feedback}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="group">
                  <label className="block mb-2 font-bold text-gray-700 flex items-center gap-2">
                    <FaLock className="text-red-500" />
                    Confirm New Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all hover:border-red-300 pr-12 bg-white"
                      required
                      placeholder="Confirm your new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600 transition-colors"
                    >
                      {showPasswords.confirm ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </button>
                  </div>
                  {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                    <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                      <FaTimes /> Passwords do not match
                    </p>
                  )}
                  {passwordData.confirmPassword && passwordData.newPassword === passwordData.confirmPassword && (
                    <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                      <FaCheckCircle /> Passwords match
                    </p>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-xl">
                  <h4 className="font-bold text-blue-800 mb-3 flex items-center gap-2">
                    <FaShieldAlt />
                    Password Requirements:
                  </h4>
                  <ul className="text-sm text-blue-700 space-y-2">
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-blue-500 flex-shrink-0" />
                      At least 8 characters long
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-blue-500 flex-shrink-0" />
                      Include uppercase and lowercase letters
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-blue-500 flex-shrink-0" />
                      Include numbers
                    </li>
                    <li className="flex items-center gap-2">
                      <FaCheckCircle className="text-blue-500 flex-shrink-0" />
                      Include special characters (!@#$%^&*)
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading || passwordData.newPassword !== passwordData.confirmPassword || passwordStrength.score < 2}
                  className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white py-4 rounded-xl font-bold hover:from-red-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      Changing...
                    </>
                  ) : (
                    <>
                      <FaLock />
                      Change Password
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })}
                  className="px-8 py-4 bg-gray-200 text-gray-700 rounded-xl font-bold hover:bg-gray-300 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <FaTimes />
                  Clear
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
