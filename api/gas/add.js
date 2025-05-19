import connectDB from '../../utils/connectDB.js';
import { GasReading } from '../../models/GasReading.js';

export default async function handler(req, res) {
  await connectDB(); // ✅ مهم جدا

  if (req.method === 'POST') {
    const { gas, temperature } = req.body;
    try {
      const newReading = new GasReading({ gas, temperature });
      await newReading.save();
      res.status(201).json({ message: 'Reading stored', data: newReading });
    } catch (err) {
      res.status(500).json({ message: 'Database error', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
