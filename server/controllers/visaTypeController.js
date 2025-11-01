import VisaType from '../models/VisaType.js';

// @desc    Get all visa types
// @route   GET /api/visa-types
// @access  Public
export const getVisaTypes = async (req, res) => {
  try {
    const visaTypes = await VisaType.find();
    res.status(200).json(visaTypes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
