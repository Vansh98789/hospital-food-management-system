// controllers/dietChartController.js
const db = require('../config/db');  // Your database connection setup

// POST request to create a diet chart
const createDietChart = async (req, res) => {
  const { patient_id, meal_type, morning_meal, evening_meal, night_meal } = req.body;

  try {
    const result = await db.query(
      'INSERT INTO diet_charts (patient_id, meal_type, morning_meal, evening_meal, night_meal) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [patient_id, meal_type, morning_meal, evening_meal, night_meal]
    );
    
    const newDietChart = result.rows[0];
    res.status(201).json(newDietChart);
  } catch (error) {
    console.error('Error creating diet chart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET request to get all diet charts for a specific patient by patient ID
const getDietChartByPatientId = async (req, res) => {
  const { patient_id } = req.params; // Extract the patient_id from the URL parameter

  try {
    const result = await db.query('SELECT * FROM diet_charts WHERE patient_id = $1', [patient_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Diet charts not found for this patient' });
    }

    res.status(200).json(result.rows); // Return the diet charts for the patient
  } catch (error) {
    console.error('Error fetching diet charts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET request to get all diet charts (optional, if needed for admin or other roles)
const getAllDietCharts = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM diet_charts');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching diet charts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT request to update a diet chart
const updateDietChart = async (req, res) => {
  const { id } = req.params;
  const { patient_id, meal_type, morning_meal, evening_meal, night_meal } = req.body;

  try {
    const result = await db.query(
      'UPDATE diet_charts SET patient_id = $1, meal_type = $2, morning_meal = $3, evening_meal = $4, night_meal = $5 WHERE id = $6 RETURNING *',
      [patient_id, meal_type, morning_meal, evening_meal, night_meal, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Diet chart not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating diet chart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE request to delete a diet chart
const deleteDietChart = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await db.query('DELETE FROM diet_charts WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Diet chart not found' });
    }

    res.status(200).json({ message: 'Diet chart deleted successfully' });
  } catch (error) {
    console.error('Error deleting diet chart:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createDietChart, getDietChartByPatientId, getAllDietCharts, updateDietChart, deleteDietChart };
