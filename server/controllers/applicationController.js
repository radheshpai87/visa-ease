import VisaApplication from '../models/VisaApplication.js';
import Applicant from '../models/Applicant.js';
import ApplicationStatus from '../models/ApplicationStatus.js';
import VisaType from '../models/VisaType.js';
import Officer from '../models/Officer.js';

// @desc    Get all visa applications
// @route   GET /api/applications
// @access  Private
export const getApplications = async (req, res) => {
  try {
    let applications;
    // req.user comes from JWT decode which has userId (not _id)
    const userId = req.user.userId || req.user._id;
    
    // If the user is an admin or officer, get all applications
    if (req.user.role === 'admin' || req.user.role === 'officer') {
      applications = await VisaApplication.find().populate('applicant_id type_id status_id');
    } else {
      // If the user is an applicant, get only their applications
      const applicant = await Applicant.findOne({ user_id: userId });
      if (!applicant) {
        return res.status(404).json({ message: 'Applicant profile not found for this user.' });
      }
      applications = await VisaApplication.find({ applicant_id: applicant._id }).populate('type_id status_id');
    }
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error in getApplications:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Create a new visa application
// @route   POST /api/applications
// @access  Private (Applicant)
export const createApplication = async (req, res) => {
  try {
    const { type_id, status_id, appointment_date, notes } = req.body;

    // req.user comes from JWT decode which has userId (not _id)
    const userId = req.user.userId || req.user._id;

    // Find the applicant profile for the logged-in user
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

    // If no status_id provided, set it to 'Pending' by default
    let finalStatusId = status_id;
    if (!finalStatusId) {
      const pendingStatus = await ApplicationStatus.findOne({ name: 'Pending' });
      if (pendingStatus) {
        finalStatusId = pendingStatus._id;
      }
    }

    const application = new VisaApplication({
      applicant_id: applicant._id,
      type_id,
      status_id: finalStatusId,
      appointment_date,
      notes
    });

    const createdApplication = await application.save();
    res.status(201).json(createdApplication);
  } catch (error) {
    console.error('Error in createApplication:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get a single visa application
// @route   GET /api/applications/:id
// @access  Private
export const getApplicationById = async (req, res) => {
  try {
    const application = await VisaApplication.findById(req.params.id)
      .populate('applicant_id')
      .populate('type_id')
      .populate('status_id')
      .populate('assigned_officer_id');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Check if the user is authorized to view this application
    // req.user comes from JWT decode which has userId (not _id)
    const userId = req.user.userId || req.user._id;
    
    if (req.user.role === 'applicant') {
      // If applicant_id is populated, it's an object, otherwise it's an ObjectId
      const applicantId = application.applicant_id._id || application.applicant_id;
      const applicant = await Applicant.findById(applicantId);
      
      if (!applicant) {
        return res.status(404).json({ message: 'Applicant profile not found' });
      }
      
      if (applicant.user_id.toString() !== userId.toString()) {
        return res.status(403).json({ message: 'User not authorized to view this application' });
      }
    }

    res.status(200).json(application);
  } catch (error) {
    console.error('Error in getApplicationById:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a visa application
// @route   PUT /api/applications/:id
// @access  Private (Admin, Officer)
export const updateApplication = async (req, res) => {
  try {
    const { status_id, assigned_officer_id, appointment_date, notes } = req.body;

    let application = await VisaApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    application.status_id = status_id || application.status_id;
    application.assigned_officer_id = assigned_officer_id || application.assigned_officer_id;
    application.appointment_date = appointment_date || application.appointment_date;
    application.notes = notes || application.notes;

    const updatedApplication = await application.save();
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a visa application
// @route   DELETE /api/applications/:id
// @access  Private (Admin)
export const deleteApplication = async (req, res) => {
  try {
    const application = await VisaApplication.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    await application.remove();
    res.status(200).json({ message: 'Application removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
