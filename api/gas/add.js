import { connectToDatabase } from '../../lib/db.js';
import { GasReading } from '../../models/GasReading.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await connectToDatabase();

    const { gas, temperature } = req.body;

    if (gas == null || temperature == null) {
      return res.status(400).json({ message: 'Missing gas or temperature' });
    }

    const reading = new GasReading({ gas, temperature });
    await reading.save();

    res.status(201).json({ message: 'Reading stored', data: reading });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
}
