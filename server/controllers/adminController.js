import User from '../models/User.js';
import VisaApplication from '../models/VisaApplication.js';
import ApplicationStatus from '../models/ApplicationStatus.js';
import Applicant from '../models/Applicant.js';
import Officer from '../models/Officer.js';
import VisaType from '../models/VisaType.js';
import Document from '../models/Document.js';
import bcrypt from 'bcryptjs';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create new user
// @route   POST /api/admin/users
// @access  Private (Admin)
export const createUser = async (req, res) => {
  try {
    const { username, email, password, role, phone } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email or username' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
      phone
    });

    // Create corresponding profile
    if (role === 'applicant') {
      await Applicant.create({
        user_id: user._id,
        first_name: username,
        last_name: '',
        date_of_birth: new Date(),
        nationality: 'Unknown',
        passport_number: 'PENDING',
        phone: phone || ''
      });
    } else if (role === 'officer') {
      await Officer.create({
        user_id: user._id,
        first_name: username,
        last_name: '',
        employee_id: `EMP${Date.now()}`,
        department: 'General'
      });
    }

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      phone: user.phone
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a user
// @route   PUT /api/admin/users/:id
// @access  Private (Admin)
export const updateUser = async (req, res) => {
  try {
    const { username, email, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.role = role || user.role;

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete associated profiles
    if (user.role === 'applicant') {
      await Applicant.deleteOne({ user_id: user._id });
    } else if (user.role === 'officer') {
      await Officer.deleteOne({ user_id: user._id });
    }

    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: 'User removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get dashboard statistics
// @route   GET /api/admin/statistics
// @access  Private (Admin)
export const getStatistics = async (req, res) => {
  try {
    // Total counts
    const totalUsers = await User.countDocuments();
    const totalApplications = await VisaApplication.countDocuments();
    const totalApplicants = await Applicant.countDocuments();
    const totalOfficers = await Officer.countDocuments();

    // Status-based counts
    const pendingStatus = await ApplicationStatus.findOne({ name: 'Pending' });
    const approvedStatus = await ApplicationStatus.findOne({ name: 'Approved' });
    const rejectedStatus = await ApplicationStatus.findOne({ name: 'Rejected' });
    const reviewStatus = await ApplicationStatus.findOne({ name: 'In Review' });
    const moreInfoStatus = await ApplicationStatus.findOne({ name: 'More Info Required' });

    const pendingCount = pendingStatus ? await VisaApplication.countDocuments({ status_id: pendingStatus._id }) : 0;
    const approvedCount = approvedStatus ? await VisaApplication.countDocuments({ status_id: approvedStatus._id }) : 0;
    const rejectedCount = rejectedStatus ? await VisaApplication.countDocuments({ status_id: rejectedStatus._id }) : 0;
    const inReviewCount = reviewStatus ? await VisaApplication.countDocuments({ status_id: reviewStatus._id }) : 0;
    const moreInfoCount = moreInfoStatus ? await VisaApplication.countDocuments({ status_id: moreInfoStatus._id }) : 0;

    // Applications by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const applicationsByMonth = await VisaApplication.aggregate([
      {
        $match: {
          application_date: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$application_date' },
            month: { $month: '$application_date' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    // Format monthly data for charts
    const monthlyApplications = applicationsByMonth.map(item => ({
      month: `${item._id.year}-${String(item._id.month).padStart(2, '0')}`,
      count: item.count
    }));

    // Applications by visa type
    const applicationsByType = await VisaApplication.aggregate([
      {
        $lookup: {
          from: 'visatypes',
          localField: 'type_id',
          foreignField: '_id',
          as: 'visa_type'
        }
      },
      {
        $unwind: '$visa_type'
      },
      {
        $group: {
          _id: '$visa_type.name',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          type: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);

    res.status(200).json({
      totalUsers,
      totalApplications,
      totalApplicants,
      totalOfficers,
      pendingApprovals: pendingCount,
      statusCounts: {
        pending: pendingCount,
        inReview: inReviewCount,
        approved: approvedCount,
        rejected: rejectedCount,
        moreInfo: moreInfoCount
      },
      monthlyApplications,
      applicationsByType
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get audit logs (placeholder - implement based on your audit log model)
// @route   GET /api/admin/audit-logs
// @access  Private (Admin)
export const getAuditLogs = async (req, res) => {
  try {
    // Return recent user activities
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .select('-password');
    
    const logs = recentUsers.map(user => ({
      _id: user._id,
      action: `New ${user.role} registered`,
      username: user.username,
      email: user.email,
      role: user.role,
      created_at: user.createdAt
    }));

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all applications (Admin view)
// @route   GET /api/admin/applications
// @access  Private (Admin)
export const getAllApplications = async (req, res) => {
  try {
    const applications = await VisaApplication.find()
      .populate('applicant_id', 'first_name last_name passport_number')
      .populate('type_id', 'name fee')
      .populate('status_id', 'name description')
      .sort({ application_date: -1 });
    
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete an application
// @route   DELETE /api/admin/applications/:id
// @access  Private (Admin)
export const deleteApplication = async (req, res) => {
  try {
    const application = await VisaApplication.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Delete associated documents
    await Document.deleteMany({ application_id: application._id });
    
    await VisaApplication.deleteOne({ _id: application._id });
    res.status(200).json({ message: 'Application and associated documents removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all visa types
// @route   GET /api/admin/visa-types
// @access  Private (Admin)
export const getAllVisaTypes = async (req, res) => {
  try {
    const visaTypes = await VisaType.find().sort({ name: 1 });
    res.status(200).json(visaTypes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create visa type
// @route   POST /api/admin/visa-types
// @access  Private (Admin)
export const createVisaType = async (req, res) => {
  try {
    const { name, fee, duration_days, required_docs_list } = req.body;
    
    const visaType = await VisaType.create({
      name,
      fee,
      duration_days,
      required_docs_list: required_docs_list || []
    });
    
    res.status(201).json(visaType);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'Visa type with this name already exists' });
    } else {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }
};

// @desc    Update visa type
// @route   PUT /api/admin/visa-types/:id
// @access  Private (Admin)
export const updateVisaType = async (req, res) => {
  try {
    const { name, fee, duration_days, required_docs_list } = req.body;
    
    const visaType = await VisaType.findById(req.params.id);
    
    if (!visaType) {
      return res.status(404).json({ message: 'Visa type not found' });
    }
    
    visaType.name = name || visaType.name;
    visaType.fee = fee !== undefined ? fee : visaType.fee;
    visaType.duration_days = duration_days || visaType.duration_days;
    visaType.required_docs_list = required_docs_list || visaType.required_docs_list;
    
    const updatedVisaType = await visaType.save();
    res.status(200).json(updatedVisaType);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete visa type
// @route   DELETE /api/admin/visa-types/:id
// @access  Private (Admin)
export const deleteVisaType = async (req, res) => {
  try {
    const visaType = await VisaType.findById(req.params.id);
    
    if (!visaType) {
      return res.status(404).json({ message: 'Visa type not found' });
    }
    
    // Check if any applications use this visa type
    const applicationsCount = await VisaApplication.countDocuments({ type_id: visaType._id });
    if (applicationsCount > 0) {
      return res.status(400).json({ 
        message: `Cannot delete visa type. ${applicationsCount} application(s) are using this visa type.` 
      });
    }
    
    await VisaType.deleteOne({ _id: visaType._id });
    res.status(200).json({ message: 'Visa type removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all documents
// @route   GET /api/admin/documents
// @access  Private (Admin)
export const getAllDocuments = async (req, res) => {
  try {
    const documents = await Document.find()
      .populate({
        path: 'application_id',
        populate: [
          { path: 'applicant_id', select: 'first_name last_name passport_number' },
          { path: 'type_id', select: 'name' }
        ]
      })
      .sort({ upload_date: -1 });
    
    res.status(200).json(documents);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a document
// @route   DELETE /api/admin/documents/:id
// @access  Private (Admin)
export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }
    
    await Document.deleteOne({ _id: document._id });
    res.status(200).json({ message: 'Document removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
