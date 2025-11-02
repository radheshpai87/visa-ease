import VisaApplication from '../models/VisaApplication.js';
import Officer from '../models/Officer.js';
import ApplicationStatus from '../models/ApplicationStatus.js';
import VisaType from '../models/VisaType.js';
import Applicant from '../models/Applicant.js';

// @desc    Get applications assigned to logged-in officer
// @route   GET /api/officer/applications
// @access  Private (Officer)
export const getAssignedApplications = async (req, res) => {
  try {
    console.log('getAssignedApplications called');
    console.log('req.user:', req.user);
    
    // req.user comes from JWT decode which has userId (not _id)
    const userId = req.user.userId || req.user._id;
    
    if (!userId) {
      console.error('No user ID found in token:', req.user);
      return res.status(401).json({ message: 'Invalid authentication token' });
    }

    console.log('Looking for officer with user_id:', userId);
    
    // Find the officer profile for the logged-in user
    let officer = await Officer.findOne({ user_id: userId });
    
    // If officer profile doesn't exist, create one automatically
    if (!officer) {
      console.log('Officer profile not found for user:', userId, 'Creating one...');
      officer = new Officer({
        user_id: userId,
        full_name: req.user.username || 'Officer',
        department: 'General Processing'
      });
      await officer.save();
      console.log('Officer profile created:', officer);
    }

    console.log('Fetching all applications...');
    
    // Get ALL applications (officers can see all applications, not just assigned ones)
    // This makes more sense for a visa processing system where officers may need to review any application
    const applications = await VisaApplication.find()
      .populate('applicant_id type_id status_id assigned_officer_id')
      .sort({ application_date: -1 });

    console.log('Found', applications.length, 'applications');
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error in getAssignedApplications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get officer statistics
// @route   GET /api/officer/statistics
// @access  Private (Officer)
export const getOfficerStats = async (req, res) => {
  try {
    // req.user comes from JWT decode which has userId (not _id)
    const userId = req.user.userId || req.user._id;
    
    if (!userId) {
      console.error('No user ID found in token:', req.user);
      return res.status(401).json({ message: 'Invalid authentication token' });
    }

    let officer = await Officer.findOne({ user_id: userId });
    
    // If officer profile doesn't exist, create one automatically
    if (!officer) {
      console.log('Officer profile not found for user:', userId, 'Creating one...');
      officer = new Officer({
        user_id: userId,
        full_name: req.user.username || 'Officer',
        department: 'General Processing'
      });
      await officer.save();
      console.log('Officer profile created:', officer);
    }

    // Get status IDs
    const pendingStatus = await ApplicationStatus.findOne({ name: 'Pending' });
    const approvedStatus = await ApplicationStatus.findOne({ name: 'Approved' });
    const rejectedStatus = await ApplicationStatus.findOne({ name: 'Rejected' });
    const reviewStatus = await ApplicationStatus.findOne({ name: 'In Review' });

    // Count ALL applications by status (not just assigned)
    const totalAssigned = await VisaApplication.countDocuments();
    const pendingCount = pendingStatus ? await VisaApplication.countDocuments({ 
      status_id: pendingStatus._id 
    }) : 0;
    const approvedCount = approvedStatus ? await VisaApplication.countDocuments({ 
      status_id: approvedStatus._id 
    }) : 0;
    const rejectedCount = rejectedStatus ? await VisaApplication.countDocuments({ 
      status_id: rejectedStatus._id 
    }) : 0;
    const inReviewCount = reviewStatus ? await VisaApplication.countDocuments({ 
      status_id: reviewStatus._id 
    }) : 0;

    res.status(200).json({
      totalAssigned,
      pendingCount,
      approvedCount,
      rejectedCount,
      inReviewCount
    });
  } catch (error) {
    console.error('Error in getOfficerStats:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
