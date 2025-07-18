const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  insuranceType: { type: String, required: true },
  coverageAmount: { type: Number, required: true },
  tenure: { type: Number, required: true },
  additionalDetails: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Quote', quoteSchema);
