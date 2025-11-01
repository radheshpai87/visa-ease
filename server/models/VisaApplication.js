import mongoose from 'mongoose';

const visaApplicationSchema = new mongoose.Schema({
  applicant_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Applicant',
    required: true
  },
  type_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VisaType',
    required: true
  },
  status_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ApplicationStatus',
    required: true
  },
  assigned_officer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Officer'
  },
  application_date: {
    type: Date,
    default: Date.now
  },
  appointment_date: {
    type: Date
  },
  notes: {
    type: String
  }
}, { timestamps: true });

const VisaApplication = mongoose.model('VisaApplication', visaApplicationSchema);

export default VisaApplication;
