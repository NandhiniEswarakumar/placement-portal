import express from 'express';
import { User } from '../db.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user.skills || []);
});

router.post('/', authMiddleware, async (req, res) => {
  const { name, category = 'Technical', proficiency = 50 } = req.body;
  if (!name) return res.status(400).json({ error: 'Name required' });
  const skill = { name, category, proficiency: Math.max(0, Math.min(100, Number(proficiency))) };
  await User.findByIdAndUpdate(req.user.id, { $push: { skills: skill } });
  res.status(201).json(skill);
});

router.delete('/:id', authMiddleware, async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { $pull: { skills: { _id: req.params.id } } });
  res.json({ ok: true });
});

export default router;
