import Review from '../models/Review.js';
import VisaApplication from '../models/VisaApplication.js';
import ApplicationStatus from '../models/ApplicationStatus.js';
import Officer from '../models/Officer.js';

// @desc    Create a new review for an application
// @route   POST /api/reviews
// @access  Private (Officer)
export const createReview = async (req, res) => {
  try {
    const { application_id, decision, remarks } = req.body;

    // req.user comes from JWT decode which has userId (not _id)
    const userId = req.user.userId || req.user._id;

    // Find the officer profile for the logged-in user
    let officer = await Officer.findOne({ user_id: userId });
    
    // If officer profile doesn't exist, create one automatically
    if (!officer) {
      officer = new Officer({
        user_id: userId,
        full_name: req.user.username || 'Officer',
        department: 'General Processing'
      });
      await officer.save();
    }

    // Check if the application exists
    const application = await VisaApplication.findById(application_id);
    if (!application) {
      return res.status(404).json({ message: 'Visa application not found.' });
    }

    const review = new Review({
      application_id,
      officer_id: officer._id,
      decision,
      remarks
    });

    const createdReview = await review.save();

    // Update the application status based on the review decision
    let newStatus;
    if (decision === 'Approved') {
      newStatus = await ApplicationStatus.findOne({ name: 'Approved' });
    } else if (decision === 'Rejected') {
      newStatus = await ApplicationStatus.findOne({ name: 'Rejected' });
    } else if (decision === 'More Info Required') {
      newStatus = await ApplicationStatus.findOne({ name: 'More Info Required' });
    }

    if (newStatus) {
      application.status_id = newStatus._id;
      await application.save();
    }

    res.status(201).json(createdReview);
  } catch (error) {
    console.error('Error in createReview:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get reviews by application ID
// @route   GET /api/reviews?application_id=<id>
// @access  Private
export const getReviewsByApplication = async (req, res) => {
  try {
    const { application_id } = req.query;

    if (!application_id) {
      return res.status(400).json({ message: 'Application ID is required' });
    }

    const reviews = await Review.find({ application_id })
      .populate('officer_id')
      .sort({ review_date: -1 });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
