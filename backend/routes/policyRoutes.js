const express = require('express');
const router = express.Router();
const Policy = require('../models/policy');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

router.post('/create', verifyToken, async (req, res) => {
    if (req.user.role !== 'admin') return res.status(403).send('Access denied');
    const policy = new Policy(req.body);
    await policy.save();
    res.status(201).send(policy);
  });
  
  router.get('/available', verifyToken, async (req, res) => {
    const policies = await Policy.find();
    res.send(policies);
  });
  
module.exports = router;