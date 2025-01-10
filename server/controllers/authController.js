const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');  // Import the pool from the config
const { JWT_SECRET, JWT_EXPIRES_IN } = require('../config/jwtConfig');  // JWT configuration

const app = express();
app.use(express.json());  // Middleware to parse JSON requests

// POST request for login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    // Get a client from the pool
    const client = await pool.connect();

    // Check if the user exists
    const result = await client.query("SELECT * FROM users WHERE email = $1", [email]);
    if (result.rows.length === 0) {
      client.release();  // Release the client back to the pool
      return res.status(404).json({ message: 'User not found' });
    }

    const user = result.rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      client.release();  // Release the client back to the pool
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    client.release();  // Release the client back to the pool

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = app;
