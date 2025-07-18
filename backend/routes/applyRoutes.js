const express = require('express');
const router = express.Router();
const Application = require('../models/applicationPolicy');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/apply', verifyToken, async (req, res) => {
    try {
      const { policyId } = req.body;
      const application = new Application({
        userId: req.user._id,
        policyId: policyId,
        status: 'Pending'
      });
      await application.save();
      res.status(201).send(application);
    } catch (error) {
      console.error('Error applying for policy:', error);
      res.status(500).send('Internal Server Error');
    }
});

router.get('/my-applications',verifyToken,async (req,res) => {
    try {
        const applications = await Application.find({ userId: req.user._id}).populate('policyId');
        res.status(200).send(applications);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).send('Internal Server Error');
    }
})

router.get('/all-applications', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const applications = await Application.find().populate('userId policyId');
    res.status(200).send(applications);
  } catch (error) {
    console.error('Error fetching all applications:', error);
    res.status(500).send('Internal Server Error');
  }
})

router.put('/update-application/:id', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        const application = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!application) return res.status(404).send('Application not found');
        res.status(200).send(application);
    } catch (error) {
        console.error('Error updating application:', error);
        res.status(500).send('Internal Server Error');
    }
});
module.exports = router;