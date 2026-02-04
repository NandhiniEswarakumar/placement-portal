import express from 'express';
import { Testimonial } from '../models/Testimonial.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get featured testimonials
router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ featured: true })
      .populate('userId', 'name')
      .limit(6);
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
});

// Create testimonial (authenticated users)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const testimonial = new Testimonial({
      userId: req.user.id,
      ...req.body
    });
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update testimonial
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });
    if (testimonial.userId.toString() !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

    Object.assign(testimonial, req.body);
    await testimonial.save();
    res.json(testimonial);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete testimonial
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });
    if (testimonial.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await Testimonial.deleteOne({ _id: req.params.id });
    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
});

export default router;
