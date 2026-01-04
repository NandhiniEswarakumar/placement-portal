import express from 'express';
import { User } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json({
    userId: user._id,
    email: user.email,
    name: user.name,
    role: user.role,
    ...user.profile,
    joinedAt: user.joinedAt
  });
});

router.put('/me', authMiddleware, async (req, res) => {
  const {
    jobTitle,
    location,
    bio,
    linkedin,
    website,
    github,
    portfolio,
    phone,
    degree,
    graduationYear,
    cgpa,
    resumeUrl,
    languages = [],
    projects = []
  } = req.body;

  await User.findByIdAndUpdate(req.user.id, {
    profile: {
      jobTitle: jobTitle || '',
      location: location || '',
      bio: bio || '',
      linkedin: linkedin || '',
      website: website || '',
      github: github || '',
      portfolio: portfolio || '',
      phone: phone || '',
      degree: degree || '',
      graduationYear: graduationYear || '',
      cgpa: cgpa || '',
      resumeUrl: resumeUrl || '',
      languages: languages.map((l) => ({ name: l.name || '', proficiency: l.proficiency || '' })),
      projects: projects.map((p) => ({ title: p.title || '', description: p.description || '', link: p.link || '' }))
    }
  });

  res.json({ ok: true });
});

export default router;
