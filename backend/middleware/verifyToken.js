const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send('No token');

  console.log('Auth header received:', authHeader);

  // extract token from header properly
  const token = authHeader.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : authHeader;

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) return res.status(400).send('Invalid token');
      console.log('Decoded token:', decoded);
      req.user = decoded;
      next();
    });
};

module.exports = verifyToken;
