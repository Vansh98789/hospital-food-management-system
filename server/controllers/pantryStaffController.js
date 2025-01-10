const pool = require('../config/db');  // Import PostgreSQL pool

// POST request to create pantry staff
const createPantryStaff = async (req, res) => {
  const { name, contact_info, role } = req.body;

  try {
    // Get a client from the pool
    const client = await pool.connect();

    // Insert pantry staff into the database
    const result = await client.query(
      'INSERT INTO pantry_staff (name, contact_info, role) VALUES ($1, $2, $3) RETURNING *',
      [name, contact_info, role]
    );

    const newPantryStaff = result.rows[0];
    client.release();  // Release the client back to the pool

    res.status(201).json(newPantryStaff);
  } catch (error) {
    console.error('Error creating pantry staff:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET request to get all pantry staff
const getAllPantryStaff = async (req, res) => {
  try {
    // Get a client from the pool
    const client = await pool.connect();

    // Query to fetch all pantry staff
    const result = await client.query('SELECT * FROM pantry_staff');

    client.release();  // Release the client back to the pool

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching pantry staff:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT request to update pantry staff details
const updatePantryStaff = async (req, res) => {
  const { id } = req.params;
  const { name, contact_info, role } = req.body;

  try {
    // Get a client from the pool
    const client = await pool.connect();

    // Update pantry staff details
    const result = await client.query(
      'UPDATE pantry_staff SET name = $1, contact_info = $2, role = $3 WHERE id = $4 RETURNING *',
      [name, contact_info, role, id]
    );

    client.release();  // Release the client back to the pool

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pantry staff not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating pantry staff:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE request to delete pantry staff
const deletePantryStaff = async (req, res) => {
  const { id } = req.params;

  try {
    // Get a client from the pool
    const client = await pool.connect();

    // Delete pantry staff from the database
    const result = await client.query('DELETE FROM pantry_staff WHERE id = $1 RETURNING *', [id]);

    client.release();  // Release the client back to the pool

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Pantry staff not found' });
    }

    res.status(200).json({ message: 'Pantry staff deleted successfully' });
  } catch (error) {
    console.error('Error deleting pantry staff:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createPantryStaff, getAllPantryStaff, updatePantryStaff, deletePantryStaff };
