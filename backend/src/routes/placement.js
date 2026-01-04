import express from 'express';
import { User } from '../db.js';
import { PlacementDrive } from '../models/placementDrive.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Get placement stats
router.get('/stats', authMiddleware, async (req, res) => {
  try {
    const activeDrives = await PlacementDrive.countDocuments({ status: 'upcoming' });
    const registeredStudents = await User.countDocuments({ role: 'student' });
    const partnerCompanies = await PlacementDrive.distinct('company');
    
    // Mock placement count - should be from placement records if available
    const placementsYTD = 127;

    res.json({
      activeDrives,
      registeredStudents,
      partnerCompanies: partnerCompanies.length,
      placementsYTD
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Get upcoming drives
router.get('/drives', authMiddleware, async (req, res) => {
  try {
    const drives = await PlacementDrive.find({ status: 'upcoming' })
      .populate('registeredStudents', 'email name')
      .sort({ date: 1 });
    res.json(drives);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch drives' });
  }
});

// Register student for a drive
router.post('/drives/:driveId/register', authMiddleware, async (req, res) => {
  try {
    const { driveId } = req.params;
    const userId = req.user.id;
    const drive = await PlacementDrive.findById(driveId);
    if (!drive) return res.status(404).json({ error: 'Drive not found' });

    if (!drive.registeredStudents.includes(userId)) {
      drive.registeredStudents.push(userId);
      await drive.save();
    }

    res.json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register' });
  }
});

export default router;
