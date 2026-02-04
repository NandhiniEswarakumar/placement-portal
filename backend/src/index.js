import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { initDb } from './db.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import skillRoutes from './routes/skills.js';
import placementRoutes from './routes/placement.js';
import jobRoutes from './routes/jobs.js';
import testimonialRoutes from './routes/testimonials.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*'}));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/placement', placementRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/testimonials', testimonialRoutes);

async function start() {
  await initDb();
  app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
  });
}

start().catch(err => {
  console.error('Failed to start:', err);
  process.exit(1);
});
