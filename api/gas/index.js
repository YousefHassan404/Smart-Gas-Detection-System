import { connectToDatabase } from '../../lib/db.js';
import { GasReading } from '../../models/GasReading.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    await connectToDatabase();

    const readings = await GasReading.find().sort({ timestamp: -1 });
    res.status(200).json(readings);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch readings', error: err.message });
  }
}
