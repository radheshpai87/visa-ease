import mongoose from 'mongoose';

const applicationStatusSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['Pending', 'Approved', 'Rejected', 'In Review', 'More Info Required']
  }
});

const ApplicationStatus = mongoose.model('ApplicationStatus', applicationStatusSchema);

export default ApplicationStatus;
