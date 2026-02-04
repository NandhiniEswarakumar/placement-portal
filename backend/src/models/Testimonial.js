import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  avatar: String,
  featured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
