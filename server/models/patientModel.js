// /models/patientModel.js
const { Pool } = require('pg');
const pool = require('../config/db');  // Use your db connection from config

const Patient = {
  // Create a new patient
  createPatient: async (patientData) => {
    const query = `
      INSERT INTO patients (name, age, gender, room_number, bed_number, floor_number, diseases, allergies, contact_info, emergency_contact, additional_info)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`;
    const values = [
      patientData.name,
      patientData.age,
      patientData.gender,
      patientData.room_number,
      patientData.bed_number,
      patientData.floor_number,
      patientData.diseases,
      patientData.allergies,
      patientData.contact_info,
      patientData.emergency_contact,
      patientData.additional_info
    ];

    const result = await pool.query(query, values);
    return result.rows[0];  // Return the created patient
  },

  // Get all patients
  getAllPatients: async () => {
    const query = 'SELECT * FROM patients';
    const result = await pool.query(query);
    return result.rows;  // Return all patients
  },

  // Get patient by ID
  getPatientById: async (id) => {
    const query = 'SELECT * FROM patients WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];  // Return the patient with the given ID
  },

  // Update patient details
  updatePatient: async (id, patientData) => {
    const query = `
      UPDATE patients 
      SET name = $1, age = $2, gender = $3, room_number = $4, bed_number = $5, floor_number = $6, diseases = $7, allergies = $8, contact_info = $9, emergency_contact = $10, additional_info = $11
      WHERE id = $12
      RETURNING *`;
    const values = [
      patientData.name,
      patientData.age,
      patientData.gender,
      patientData.room_number,
      patientData.bed_number,
      patientData.floor_number,
      patientData.diseases,
      patientData.allergies,
      patientData.contact_info,
      patientData.emergency_contact,
      patientData.additional_info,
      id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];  // Return the updated patient
  },

  // Delete a patient
  deletePatient: async (id) => {
    const query = 'DELETE FROM patients WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];  // Return the deleted patient
  }
};

module.exports = Patient;
