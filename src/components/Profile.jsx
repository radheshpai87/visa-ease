import React, { useState, useEffect } from 'react';
import axios from '../api';
import { toast } from 'react-toastify';
import { FaUser, FaLock, FaCamera, FaEye, FaEyeSlash, FaSave, FaTimes } from 'react-icons/fa';
import zxcvbn from 'zxcvbn';

const Profile = () => {
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
      const response = await axios.get('/api/auth/me');
      setProfileData({
        username: response.data.username || '',
        email: response.data.email || '',
        phone: response.data.phone || '',
        role: response.data.role || ''
      });
      setProfilePicture(response.data.profilePicture || null);
    } catch {
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
      await axios.put('/api/auth/update-profile', {
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
      await axios.put('/api/auth/change-password', {
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

    try {
      const response = await axios.post('/api/auth/upload-profile-picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfilePicture(response.data.profilePicture);
      toast.success('Profile picture updated!');
    } catch {
      toast.error('Failed to upload profile picture');
    } finally {
      setUploadingImage(false);
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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-2xl shadow-lg p-8 border-b-4 border-[#be0b32]">
          <div className="flex items-center gap-6">
            {/* Profile Picture */}
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#be0b32] to-[#8c0826] flex items-center justify-center text-white text-3xl font-bold shadow-lg overflow-hidden">
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  profileData.username.charAt(0).toUpperCase()
                )}
              </div>
              <label
                htmlFor="profile-upload"
                className="absolute bottom-0 right-0 bg-[#be0b32] p-2 rounded-full cursor-pointer hover:bg-[#8c0826] transition-colors shadow-lg"
              >
                <FaCamera className="text-white text-sm" />
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

            {/* User Info */}
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{profileData.username}</h1>
              <p className="text-gray-600">{profileData.email}</p>
              <span className={`inline-block mt-2 px-3 py-1 text-xs font-semibold rounded-full ${
                profileData.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                profileData.role === 'officer' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {profileData.role?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white shadow-lg">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'profile'
                  ? 'text-[#be0b32] border-b-2 border-[#be0b32]'
                  : 'text-gray-600 hover:text-[#be0b32]'
              }`}
            >
              <FaUser /> Profile Information
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`flex-1 py-4 px-6 text-center font-semibold transition-colors flex items-center justify-center gap-2 ${
                activeTab === 'password'
                  ? 'text-[#be0b32] border-b-2 border-[#be0b32]'
                  : 'text-gray-600 hover:text-[#be0b32]'
              }`}
            >
              <FaLock /> Change Password
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-b-2xl shadow-lg p-8">
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Username *</label>
                  <input
                    type="text"
                    name="username"
                    value={profileData.username}
                    onChange={handleProfileChange}
                    className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleProfileChange}
                    className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleProfileChange}
                    className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent transition-all"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Role</label>
                  <input
                    type="text"
                    value={profileData.role}
                    className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg bg-gray-100 cursor-not-allowed"
                    disabled
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading || uploadingImage}
                  className="flex-1 bg-[#be0b32] text-white py-3 rounded-lg font-semibold hover:bg-[#8c0826] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
              <div className="space-y-6">
                {/* Current Password */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Current Password *</label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent transition-all pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, current: !showPasswords.current })}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.current ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">New Password *</label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent transition-all pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.new ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {passwordData.newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                            style={{ width: `${(passwordStrength.score + 1) * 20}%` }}
                          />
                        </div>
                        <span className={`text-xs font-semibold ${
                          passwordStrength.score < 2 ? 'text-red-600' :
                          passwordStrength.score < 4 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      {passwordStrength.feedback && (
                        <p className="text-xs text-gray-600 mt-1">{passwordStrength.feedback}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block mb-2 font-semibold text-gray-700">Confirm New Password *</label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full border-2 border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#be0b32] focus:border-transparent transition-all pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords.confirm ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                    <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
                  )}
                </div>

                {/* Password Requirements */}
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Password Requirements:</h4>
                  <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
                    <li>At least 8 characters long</li>
                    <li>Include uppercase and lowercase letters</li>
                    <li>Include numbers</li>
                    <li>Include special characters (!@#$%^&*)</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading || passwordData.newPassword !== passwordData.confirmPassword || passwordStrength.score < 2}
                  className="flex-1 bg-[#be0b32] text-white py-3 rounded-lg font-semibold hover:bg-[#8c0826] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center gap-2"
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
