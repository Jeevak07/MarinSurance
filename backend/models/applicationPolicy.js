const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  policyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Policy',
  },
  status: {
    type: String,
    default: 'Pending',
  },
  appliedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Application', applicationSchema);
