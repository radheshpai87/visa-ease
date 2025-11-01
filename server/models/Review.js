import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  application_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VisaApplication',
    required: true
  },
  officer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Officer',
    required: true
  },
  review_date: {
    type: Date,
    default: Date.now
  },
  decision: {
    type: String,
    required: true,
    enum: ['Approved', 'Rejected', 'More Info Required']
  },
  remarks: {
    type: String
  }
}, { timestamps: true });

const Review = mongoose.model('Review', reviewSchema);

export default Review;
