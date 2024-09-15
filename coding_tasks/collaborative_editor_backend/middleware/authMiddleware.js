// authMiddleware.js
const { requireSession } = require('@clerk/clerk-sdk-node');

// Middleware to authenticate users
const authMiddleware = async (req, res, next) => {
  try {
    // Require session to authenticate the user
    await requireSession(req);

    // If session is valid, proceed to the next middleware or route
    next();
  } catch (err) {
    console.error('Authentication failed:', err);
    return res.status(401).json({ message: 'Unauthorized. Please log in.' });
  }
};

module.exports = authMiddleware;
