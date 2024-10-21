const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();  // Load environment variables

exports.protect = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).send('Not authorized');
  }
};