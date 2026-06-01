const mongoose = require('mongoose');

const gateSchema = new mongoose.Schema({
  gateNumber:   { type: String, required: true, unique: true, trim: true },
  fastVotes:    { type: Number, default: 0, min: 0 },
  slowVotes:    { type: Number, default: 0, min: 0 },
  blockedVotes: { type: Number, default: 0, min: 0 },
  lastUpdated:  { type: Date, default: Date.now }
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

gateSchema.virtual('status').get(function () {
  const { fastVotes, slowVotes, blockedVotes } = this;
  if (blockedVotes >= slowVotes && blockedVotes >= fastVotes && blockedVotes > 0) return 'blocked';
  if (slowVotes > fastVotes && slowVotes > 0) return 'slow';
  return 'fast';
});

module.exports = mongoose.model('Gate', gateSchema);
