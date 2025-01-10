const { Pool } = require('pg');  // Destructure Pool from the pg module
require('dotenv').config();  // Ensure environment variables are loaded
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, 
  ssl: {
    rejectUnauthorized: false,  
  },
});

module.exports = pool;
