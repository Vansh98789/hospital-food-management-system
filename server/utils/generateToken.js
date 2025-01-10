// /utils/generateToken.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; // Use your JWT secret from .env

// Function to generate a JWT token for a user
const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
  };

  const options = {
    expiresIn: '1h', // Token will expire in 1 hour
  };

  return jwt.sign(payload, JWT_SECRET, options); // Sign and return the token
};

module.exports = generateToken;
