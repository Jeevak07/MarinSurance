const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).send('Access denied. Admins only.');
    next();
}

module.exports = verifyAdmin;