// api/routes/gasRoutes.js
import express from 'express';
import { GasReading } from '../models/GasReading.js';

const router = express.Router();

// POST: Add a gas reading
router.post('/add', async (req, res) => {
  try {
    const { gas, temperature } = req.body;
    const newReading = new GasReading({ gas, temperature });
    await newReading.save();
    res.status(201).json({ message: 'Reading stored', data: newReading });
  } catch (err) {
    res.status(500).json({ message: 'Failed to store reading', error: err.message });
  }
});

// GET: Get all readings
router.get('/', async (req, res) => {
  try {
    const readings = await GasReading.find().sort({ timestamp: -1 });
    res.status(200).json(readings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch readings', error: err.message });
  }
});

export default router;
