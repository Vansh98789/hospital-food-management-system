// /models/dietChartModel.js
const { Pool } = require('pg');
const pool = require('../config/db');  // Use your db connection from config

const DietChart = {
  // Create a new diet chart for a patient
  createDietChart: async (patientId, dietData) => {
    const query = `
      INSERT INTO diet_charts (patient_id, morning_meal, evening_meal, night_meal, special_instructions)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
    const values = [
      patientId,
      dietData.morning_meal,
      dietData.evening_meal,
      dietData.night_meal,
      dietData.special_instructions
    ];

    const result = await pool.query(query, values);
    return result.rows[0];  // Return the created diet chart
  },

  // Get diet chart by patient ID
  getDietChartByPatientId: async (patientId) => {
    const query = 'SELECT * FROM diet_charts WHERE patient_id = $1';
    const result = await pool.query(query, [patientId]);
    return result.rows;  // Return the diet chart for the given patient
  },

  // Update diet chart
  updateDietChart: async (id, dietData) => {
    const query = `
      UPDATE diet_charts 
      SET morning_meal = $1, evening_meal = $2, night_meal = $3, special_instructions = $4
      WHERE id = $5
      RETURNING *`;
    const values = [
      dietData.morning_meal,
      dietData.evening_meal,
      dietData.night_meal,
      dietData.special_instructions,
      id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];  // Return the updated diet chart
  },

  // Delete diet chart
  deleteDietChart: async (id) => {
    const query = 'DELETE FROM diet_charts WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];  // Return the deleted diet chart
  }
};

module.exports = DietChart;
