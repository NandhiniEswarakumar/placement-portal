import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['student', 'hr', 'placement'], default: 'student' },
  profile: {
    jobTitle: String,
    location: String,
    bio: String,
    linkedin: String,
    website: String
  },
  skills: [{
    name: String,
    category: String,
    proficiency: Number
  }],
  joinedAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', userSchema);

export async function initDb() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/rekrootdesk';
  await mongoose.connect(mongoUri, { maxPoolSize: 10 });
  console.log('Connected to MongoDB');
}
export default mongoose.connection;