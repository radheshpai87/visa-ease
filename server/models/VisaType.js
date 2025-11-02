import mongoose from 'mongoose';

const visaTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  fee: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR',
    enum: ['INR', 'USD', 'EUR', 'GBP']
  },
  duration_days: {
    type: Number,
    required: true
  },
  required_docs_list: {
    type: [String],
    default: []
  }
}, { timestamps: true });

const VisaType = mongoose.model('VisaType', visaTypeSchema);

export default VisaType;
