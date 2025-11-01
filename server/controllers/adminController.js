import User from '../models/User.js';
import VisaApplication from '../models/VisaApplication.js';
import ApplicationStatus from '../models/ApplicationStatus.js';
import Applicant from '../models/Applicant.js';
import Officer from '../models/Officer.js';

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
