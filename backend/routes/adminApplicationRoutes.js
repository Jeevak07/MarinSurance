const express = require('express');
const router = express.Router();
const Application = require('../models/applicationPolicy');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');
const User = require('../models/user');
const Policy = require('../models/policy');
// Get all applications — for admin dashboard stats & listing
router.get('/application-list', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('policyId')
      .populate('userId', 'name email');
    res.status(200).send(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).send('Internal Server Error');
  }
});


router.get('/dashboard-stats', verifyToken, verifyAdmin, async (req, res) => {
  const totalUsers = await User.countDocuments()
  const totalPolicies = await Policy.countDocuments()
  const totalApplications = await Application.countDocuments()
  const pending = await Application.countDocuments({ status: 'Pending' })
  const approved = await Application.countDocuments({ status: 'Approved' })
  const rejected = await Application.countDocuments({ status: 'Rejected' })
  res.json({ totalUsers, totalPolicies, totalApplications, pending, approved, rejected })
})

// Approve an application
router.put('/update-application/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
  { status: req.body.status },
  { new: true }
    ).populate('policyId').populate('userId', 'name email');

    if (!application) return res.status(404).send('Application not found');

    res.status(200).send(application);
  } catch (error) {
    console.error('Error approving application:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
