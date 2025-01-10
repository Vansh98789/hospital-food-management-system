// /models/pantryStaffModel.js
const { Pool } = require('pg');
const pool = require('../config/db');  // Use your db connection from config

const PantryStaff = {
  // Create new pantry staff
  createPantryStaff: async (staffData) => {
    const query = `
      INSERT INTO pantry_staff (name, contact_info, role, location)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    const values = [
      staffData.name,
      staffData.contact_info,
      staffData.role,
      staffData.location
    ];

    const result = await pool.query(query, values);
    return result.rows[0];  // Return the created pantry staff
  },

  // Get all pantry staff
  getAllPantryStaff: async () => {
    const query = 'SELECT * FROM pantry_staff';
    const result = await pool.query(query);
    return result.rows;  // Return all pantry staff
  },

  // Update pantry staff
  updatePantryStaff: async (id, staffData) => {
    const query = `
      UPDATE pantry_staff 
      SET name = $1, contact_info = $2, role = $3, location = $4
      WHERE id = $5
      RETURNING *`;
    const values = [
      staffData.name,
      staffData.contact_info,
      staffData.role,
      staffData.location,
      id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];  // Return the updated pantry staff
  },

  // Delete pantry staff
  deletePantryStaff: async (id) => {
    const query = 'DELETE FROM pantry_staff WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];  // Return the deleted pantry staff
  }
};

module.exports = PantryStaff;
