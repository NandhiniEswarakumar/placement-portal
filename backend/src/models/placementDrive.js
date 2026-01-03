import mongoose from 'mongoose';

const placementDriveSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  date: { type: Date, required: true },
  registeredStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['upcoming', 'ongoing', 'completed'], default: 'upcoming' },
  createdAt: { type: Date, default: Date.now }
});

export const PlacementDrive = mongoose.model('PlacementDrive', placementDriveSchema);
