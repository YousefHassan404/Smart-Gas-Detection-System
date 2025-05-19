// api/models/GasReading.js
import mongoose from 'mongoose';

const gasReadingSchema = new mongoose.Schema({
  gas: {
    type: Number,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

export const GasReading = mongoose.models.GasReading || mongoose.model('GasReading', gasReadingSchema);
