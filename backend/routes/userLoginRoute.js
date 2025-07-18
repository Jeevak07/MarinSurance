const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const dotenv = require('dotenv');
const verifyToken = require('../middleware/verifyToken');
const verifyAdmin = require('../middleware/verifyAdmin');

require('dotenv').config();
const secretKey = process.env.SECRET_KEY;   



//signup a user
router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body; // added role
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).send('User already exists');
  
      const user = new User({
        name,
        email,
        password: hashedPassword,
        role // save role
      });
  
      await user.save();
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  });


//login a user
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ email: req.body.email });
    if (!userData) return res.status(400).send('email not exist');

    const validPass = await bcrypt.compare(req.body.password, userData.password);
    if (!validPass) return res.status(400).send('Invalid password');

    const token = await jwt.sign(
      {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role 
      },
      secretKey
    );

    res.header('authorization', token);
    res.status(200).send({
      token,
      user: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        role: userData.role
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


//get all users
router.get('/allUsers', verifyToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find({})
      .select('-password')
      .skip(skip)
      .limit(limit);

    const totalUsers = await User.countDocuments();

    res.status(200).json({
      users,
      totalUsers,
      hasMore: skip + limit < totalUsers
    });
  } catch (error) {
    res.status(400).send(error);
  }
});


router.delete('/delete-user/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const userId = req.params.id;

    // Prevent deleting admin accounts
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.role === 'Admin') {
      return res.status(403).json({ message: 'Cannot delete an Admin account' });
    }

    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User deleted successfully' });

  } catch (error) {
    console.error('Delete User Error:', error);
    res.status(500).json({ message: 'Server error while deleting user' });
  }
});



router.put('/update/:id', verifyToken, async (req, res) => {
  try {
    const userData = await User.findById(req.params.id)
    if (!userData) return res.status(404).send('User not found')

    const updatedFields = req.body

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    )

    res.status(200).json(updatedUser)
  } catch (error) {
    console.error(error)
    res.status(400).send('Error updating user')
  }
})


router.get('/dashboard',verifyToken,verifyAdmin, (req, res) => {
    res.status(200).send(`welcome ${req.user.name} to the dashboard`);
});

router.get('/profile', verifyToken, async (req, res) => {
  console.log('Decoded req.user:', req.user)
  try {
    const user = await User.findById(req.user.id).select('-password')
    // const userData = await User.findOne({ email: req.body.email }).select('-password');
    if (!user) return res.status(404).send('User not found')
    res.status(200).json(user)
  } catch (err) {
    console.error(err)
    res.status(500).send('Server error')
  }
})

module.exports = router;

