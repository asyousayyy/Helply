const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]; // Extract token
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

      // Attach user info (except password) to req
      req.user = await User.findById(decoded.id).select('-password');

      return next(); // Proceed to next middleware/controller
    } catch (err) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  // No token provided
  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
