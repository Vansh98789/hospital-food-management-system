const { Client } = require('pg');  // Import pg.Client
require('dotenv').config();  // Make sure .env variables are loaded

// Database connection using pg.Client
const db = new Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect()  // Establish the connection to the database
  .then(() => console.log('Connected to the database successfully'))
  .catch(err => console.error('Error connecting to the database:', err));

module.exports = db;
