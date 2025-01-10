require('dotenv').config();  // Load environment variables from .env

// Secret key for JWT (should be kept secure in the .env file)
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';  // Set token expiration time (1 hour by default)

// Export JWT configuration
module.exports = {
  JWT_SECRET,
  JWT_EXPIRES_IN
};
