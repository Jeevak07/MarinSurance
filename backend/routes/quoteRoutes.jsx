const express = require('express');
const router = express.Router();
const Quote = require('../models/quote');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
// Create a new quote   
router.post('/quote', verifyToken, async (req, res) => {
  try {
    const { insuranceType, coverageAmount, tenure, additionalDetails } = req.body;

    const newQuote = new Quote({
      customerId: req.user.id, // from verifyToken
      insuranceType,
      coverageAmount,
      tenure,
      additionalDetails
    });

    await newQuote.save();
    res.status(201).json({ message: 'Quote request submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit quote request', error: err.message });
  }
});

router.get('/quotes', verifyToken, async (req, res) => {
    try {
        const quotes = await Quote.find({ customerId: req.user.id }).populate('customerId', 'name email');
        res.status(200).json(quotes);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Error fetching quotes' });
    }
})

module.exports = router;