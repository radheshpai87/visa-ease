import User from '../models/User.js';
import Applicant from '../models/Applicant.js';
import Officer from '../models/Officer.js';
import jwt from 'jsonwebtoken';
import validator from 'validator';

// Register a new user
export const register = async (req, res) => {
  try {
    let { username, email, password, phone, role, full_name, passport_number, nationality, address, department } = req.body;

    // Trim inputs
    username = username?.trim();
    email = email?.trim().toLowerCase();
    phone = phone?.trim();

    // Validate email format
    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Don't allow admin registration through public endpoint
    if (role === 'admin') {
      return res.status(403).json({ message: 'Admin registration not allowed through this endpoint' });
    }

    // Check if user already exists (use normalized email)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({
      username,
      email,
      password,
      phone,
      role: role || 'applicant' // Default to applicant
    });

    await user.save();

    // Create role-specific profile
    if (user.role === 'applicant') {
      const applicantData = {
        user_id: user._id,
        full_name: full_name || username
      };
      
      // Only add these fields if they have actual values
      if (passport_number) {
        const pn = String(passport_number).trim();
        if (pn) applicantData.passport_number = pn;
      }
      if (nationality) applicantData.nationality = nationality;
      if (address) applicantData.address = address;
      
      const applicant = new Applicant(applicantData);
      await applicant.save();
    } else if (user.role === 'officer') {
      const officer = new Officer({
        user_id: user._id,
        full_name: full_name || username,
        department: department || 'Visa Processing'
      });
      await officer.save();
    }

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set in environment');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Admin registration (separate, protected endpoint)
export const registerAdmin = async (req, res) => {
  try {
    let { username, email, password, phone, adminSecretKey } = req.body;
    username = username?.trim();
    email = email?.trim().toLowerCase();
    phone = phone?.trim();

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Debug logging
    console.log('Received adminSecretKey:', adminSecretKey);
    console.log('Expected adminSecretKey:', process.env.ADMIN_SECRET_KEY);
    console.log('Match:', adminSecretKey === process.env.ADMIN_SECRET_KEY);

    // Check admin secret key (you should set this in your .env)
    if (!process.env.ADMIN_SECRET_KEY) {
      return res.status(500).json({ message: 'Server configuration error: ADMIN_SECRET_KEY not set' });
    }

    if (adminSecretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ message: 'Invalid admin secret key' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create admin user
    const user = new User({
      username,
      email,
      password,
      phone,
      role: 'admin'
    });

    await user.save();

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set in environment');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(201).json({
      message: 'Admin registered successfully',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Admin registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    let isMatch;
    try {
      isMatch = await user.comparePassword(password);
    } catch (pwErr) {
      console.error('Password comparison failed:', pwErr);
      return res.status(500).json({ message: 'Server error during authentication' });
    }
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not set in environment');
      return res.status(500).json({ message: 'Server configuration error' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Verify token
export const verifyToken = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.status(200).json({ message: 'Token is valid', user });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user profile
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log('getMe - User object:', {
      id: user._id,
      username: user.username,
      profilePicture: user.profilePicture,
      hasProfilePicture: !!user.profilePicture
    });
    res.status(200).json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    const { username, email, phone } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if email is being changed and is already in use
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Change password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Upload profile picture (placeholder - integrate with Cloudinary)
export const uploadProfilePicture = async (req, res) => {
  try {
    console.log('=== Upload Profile Picture ===');
    console.log('User ID:', req.user.userId);
    console.log('File present:', !!req.file);
    
    if (!req.file) {
      console.log('❌ No file uploaded');
      return res.status(400).json({ message: 'Please upload a file' });
    }

    console.log('File details:');
    console.log('- Path:', req.file.path);
    console.log('- Filename:', req.file.filename);
    console.log('- Original name:', req.file.originalname);

    const user = await User.findById(req.user.userId);
    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Current profile picture:', user.profilePicture);

    // Update profile picture URL (from Cloudinary)
    user.profilePicture = req.file.path; // Cloudinary URL
    await user.save();

    console.log('✅ Profile picture updated to:', user.profilePicture);
    console.log('================================\n');

    res.status(200).json({
      message: 'Profile picture uploaded successfully',
      profilePicture: user.profilePicture
    });
  } catch (error) {
    console.error('❌ Upload profile picture error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
