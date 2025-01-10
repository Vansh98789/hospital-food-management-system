require('dotenv').config();  // Load environment variables from .env

const config = {
  port: process.env.PORT || 5000,  // Default port for the server
  databaseUrl: process.env.DATABASE_URL,  // Connection string for PostgreSQL
  jwtSecret: process.env.JWT_SECRET,  // JWT secret for authentication
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',  // JWT expiration time
  logLevel: process.env.LOG_LEVEL || 'info',  // Default log level
};

module.exports = config;
