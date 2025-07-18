const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  title: String,
  coverageAmount: Number,
  premium: Number,
  tenure: Number,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Policy', policySchema);
