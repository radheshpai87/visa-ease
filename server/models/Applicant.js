import mongoose from 'mongoose';

const applicantSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  passport_number: {
    type: String,
    required: false,
    unique: true,
    sparse: true // Do NOT set a default of null — leaving it undefined when not provided
  },
  nationality: {
    type: String,
    required: false,
    default: null
  },
  address: {
    type: String,
    required: false,
    default: null
  }
}, { timestamps: true });

const Applicant = mongoose.model('Applicant', applicantSchema);

export default Applicant;
