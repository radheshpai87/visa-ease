import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  application_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VisaApplication',
    required: true
  },
  verified_by_officer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Officer'
  },
  document_type: {
    type: String,
    required: true
  },
  file_path: {
    type: String,
    required: true
  },
  file_name: {
    type: String
  },
  upload_date: {
    type: Date,
    default: Date.now
  },
  verified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const Document = mongoose.model('Document', documentSchema);

export default Document;
