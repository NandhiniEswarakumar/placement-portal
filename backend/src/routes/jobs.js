import express from 'express';
import { Job } from '../models/Job.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get all published jobs
router.get('/', async (req, res) => {
  try {
    const { search, location, jobType, experience } = req.query;
    const filter = { status: 'published' };

    if (search) filter.position = { $regex: search, $options: 'i' };
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (jobType) filter.jobType = jobType;
    if (experience) filter.experienceLevel = experience;

    const jobs = await Job.find(filter)
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// Get single job
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name email')
      .populate('applicants.userId', 'name email profile.resumeUrl');
    if (!job) return res.status(404).json({ error: 'Job not found' });
    res.json(job);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch job' });
  }
});

// Create job (HR only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'hr') return res.status(403).json({ error: 'Unauthorized' });

    const job = new Job({
      ...req.body,
      postedBy: req.user.id
    });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update job (HR only)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'hr') return res.status(403).json({ error: 'Unauthorized' });

    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (job.postedBy.toString() !== req.user.id) return res.status(403).json({ error: 'Not owner' });

    Object.assign(job, req.body);
    job.updatedAt = new Date();
    await job.save();
    res.json(job);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete job (HR only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'hr') return res.status(403).json({ error: 'Unauthorized' });

    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });
    if (job.postedBy.toString() !== req.user.id) return res.status(403).json({ error: 'Not owner' });

    await Job.deleteOne({ _id: req.params.id });
    res.json({ message: 'Job deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete job' });
  }
});

// Apply for job
router.post('/:id/apply', authMiddleware, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ error: 'Job not found' });

    const already = job.applicants.find(a => a.userId.toString() === req.user.id);
    if (already) return res.status(400).json({ error: 'Already applied' });

    job.applicants.push({ userId: req.user.id, status: 'applied' });
    await job.save();
    res.json({ message: 'Applied successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to apply' });
  }
});

// Get job applications (HR only)
router.get('/:id/applications', authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== 'hr') return res.status(403).json({ error: 'Unauthorized' });

    const job = await Job.findById(req.params.id)
      .populate('applicants.userId', 'name email profile.resumeUrl');
    if (!job) return res.status(404).json({ error: 'Job not found' });

    res.json(job.applicants);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

export default router;
