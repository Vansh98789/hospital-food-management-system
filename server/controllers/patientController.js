const pool = require('../config/db');  // Import the PostgreSQL pool

// POST request to create a patient
const createPatient = async (req, res) => {
  const { name, diseases, allergies, room_number, bed_number, floor_number, age, gender, contact_info, emergency_contact } = req.body;

  try {
    // Get a client from the pool
    const client = await pool.connect();

    // Insert the new patient into the database
    const result = await client.query(
      'INSERT INTO patients (name, diseases, allergies, room_number, bed_number, floor_number, age, gender, contact_info, emergency_contact) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
      [name, diseases, allergies, room_number, bed_number, floor_number, age, gender, contact_info, emergency_contact]
    );

    const newPatient = result.rows[0];
    client.release();  // Release the client back to the pool

    res.status(201).json(newPatient);
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET request to get all patients
const getAllPatients = async (req, res) => {
  try {
    // Get a client from the pool
    const client = await pool.connect();

    // Query to fetch all patients
    const result = await client.query('SELECT * FROM patients');

    client.release();  // Release the client back to the pool

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching patients:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET request to get a patient by ID
const getPatientById = async (req, res) => {
  const { id } = req.params;

  try {
    // Get a client from the pool
    const client = await pool.connect();

    // Query to fetch a patient by ID
    const result = await client.query('SELECT * FROM patients WHERE id = $1', [id]);

    client.release();  // Release the client back to the pool

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching patient:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT request to update patient details
const updatePatient = async (req, res) => {
  const { id } = req.params;
  const { name, diseases, allergies, room_number, bed_number, floor_number, age, gender, contact_info, emergency_contact } = req.body;

  try {
    // Get a client from the pool
    const client = await pool.connect();

    // Update patient details
    const result = await client.query(
      'UPDATE patients SET name = $1, diseases = $2, allergies = $3, room_number = $4, bed_number = $5, floor_number = $6, age = $7, gender = $8, contact_info = $9, emergency_contact = $10 WHERE id = $11 RETURNING *',
      [name, diseases, allergies, room_number, bed_number, floor_number, age, gender, contact_info, emergency_contact, id]
    );

    client.release();  // Release the client back to the pool

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE request to delete a patient
const deletePatient = async (req, res) => {
  const { id } = req.params;

  try {
    // Get a client from the pool
    const client = await pool.connect();

    // Delete the patient from the database
    const result = await client.query('DELETE FROM patients WHERE id = $1 RETURNING *', [id]);

    client.release();  // Release the client back to the pool

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createPatient, getAllPatients, getPatientById, updatePatient, deletePatient };
