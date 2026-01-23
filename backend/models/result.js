const mongoose = require('mongoose');

const ResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // Each user only has one latest result
  },
  totalScore: {
    type: Number,
    required: true
  },
  riskCategory: {
    type: String,
    enum: ['Low Risk', 'Moderate Risk', 'High Risk'],
    required: true
  },
  recommendations: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Result', ResultSchema);
