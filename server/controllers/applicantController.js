import VisaApplication from '../models/VisaApplication.js';
import Applicant from '../models/Applicant.js';
import ApplicationStatus from '../models/ApplicationStatus.js';
import VisaType from '../models/VisaType.js';

// @desc    Get applicant statistics
// @route   GET /api/applicant/statistics
// @access  Private (Applicant)
export const getApplicantStats = async (req, res) => {
  try {
    // req.user comes from JWT decode which has userId (not _id)
    const userId = req.user.userId || req.user._id;
    
    if (!userId) {
      return res.status(401).json({ message: 'Invalid authentication token' });
    }

    let applicant = await Applicant.findOne({ user_id: userId });
    
    // If applicant profile doesn't exist, create one automatically
    if (!applicant) {
      applicant = new Applicant({
        user_id: userId,
        full_name: req.user.username || 'Applicant'
        // passport_number, nationality, and address are now optional and can be null
      });
      await applicant.save();
    }

    // Get status IDs
    const pendingStatus = await ApplicationStatus.findOne({ name: 'Pending' });
    const approvedStatus = await ApplicationStatus.findOne({ name: 'Approved' });
    const rejectedStatus = await ApplicationStatus.findOne({ name: 'Rejected' });
    const reviewStatus = await ApplicationStatus.findOne({ name: 'In Review' });

    // Count applications by status
    const totalApplications = await VisaApplication.countDocuments({ applicant_id: applicant._id });
    const pendingCount = pendingStatus ? await VisaApplication.countDocuments({ 
      applicant_id: applicant._id, 
      status_id: pendingStatus._id 
    }) : 0;
    const approvedCount = approvedStatus ? await VisaApplication.countDocuments({ 
      applicant_id: applicant._id, 
      status_id: approvedStatus._id 
    }) : 0;
    const rejectedCount = rejectedStatus ? await VisaApplication.countDocuments({ 
      applicant_id: applicant._id, 
      status_id: rejectedStatus._id 
    }) : 0;
    const inReviewCount = reviewStatus ? await VisaApplication.countDocuments({ 
      applicant_id: applicant._id, 
      status_id: reviewStatus._id 
    }) : 0;

    res.status(200).json({
      totalApplications,
      pendingCount,
      approvedCount,
      rejectedCount,
      inReviewCount
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get applicant's own applications
// @route   GET /api/applicant/applications
// @access  Private (Applicant)
export const getMyApplications = async (req, res) => {
  try {
    // req.user comes from JWT decode which has userId (not _id)
    const userId = req.user.userId || req.user._id;
    
    if (!userId) {
      return res.status(401).json({ message: 'Invalid authentication token' });
    }

    let applicant = await Applicant.findOne({ user_id: userId });
    
    // If applicant profile doesn't exist, create one automatically
    if (!applicant) {
      applicant = new Applicant({
        user_id: userId,
        full_name: req.user.username || 'Applicant'
        // passport_number, nationality, and address are now optional and can be null
      });
      await applicant.save();
    }

    const applications = await VisaApplication.find({ applicant_id: applicant._id })
      .populate('type_id status_id')
      .sort({ application_date: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
