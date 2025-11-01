import mongoose from 'mongoose';

const officerSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  full_name: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  }
}, { timestamps: true });

const Officer = mongoose.model('Officer', officerSchema);

export default Officer;
