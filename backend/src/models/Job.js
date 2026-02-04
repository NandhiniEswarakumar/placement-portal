import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  company: { type: String, required: true },
  position: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [String],
  salary: {
    min: Number,
    max: Number,
    currency: { type: String, default: 'INR' }
  },
  location: { type: String, required: true },
  jobType: { type: String, enum: ['Full-time', 'Internship', 'Part-time'], default: 'Full-time' },
  experienceLevel: { type: String, enum: ['Fresher', 'Junior', 'Mid-level', 'Senior'], default: 'Fresher' },
  skills: [String],
  applicationDeadline: { type: Date, required: true },
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  applicants: [{
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    appliedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['applied', 'shortlisted', 'rejected', 'accepted'], default: 'applied' }
  }],
  status: { type: String, enum: ['draft', 'published', 'closed'], default: 'published' },
  companyLogo: String,
  companyWebsite: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export const Job = mongoose.model('Job', jobSchema);
