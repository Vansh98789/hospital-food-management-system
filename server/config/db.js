const { Pool } = require('pg');  // Destructure Pool from the pg module
require('dotenv').config();  // Ensure environment variables are loaded

// Create a new Pool instance using the DATABASE_URLS environment variable
const pool = new Pool({
  connectionString: process.env.DATABASE_URLS,  // Use the DATABASE_URLS from .env file
  ssl: {
    rejectUnauthorized: false,  // Necessary for cloud databases (e.g., Neon, Heroku)
  },
});

// Export the pool instance for use in other files
module.exports = pool;
