// /models/taskModel.js
const { Pool } = require('pg');
const pool = require('../config/db');  // Use your db connection from config

const Task = {
  // Create a new task
  createTask: async (taskData) => {
    const query = `
      INSERT INTO tasks (patient_id, pantry_staff_id, meal_type, delivery_personnel_id, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
    const values = [
      taskData.patient_id,
      taskData.pantry_staff_id,
      taskData.meal_type,
      taskData.delivery_personnel_id,
      taskData.status
    ];

    const result = await pool.query(query, values);
    return result.rows[0];  // Return the created task
  },

  // Get all tasks
  getAllTasks: async () => {
    const query = 'SELECT * FROM tasks';
    const result = await pool.query(query);
    return result.rows;  // Return all tasks
  },

  // Get task by ID
  getTaskById: async (id) => {
    const query = 'SELECT * FROM tasks WHERE id = $1';
    const result = await pool.query(query, [id]);
    return result.rows[0];  // Return the task with the given ID
  },

  // Update task status
  updateTaskStatus: async (id, status) => {
    const query = `
      UPDATE tasks 
      SET status = $1
      WHERE id = $2
      RETURNING *`;
    const values = [status, id];

    const result = await pool.query(query, values);
    return result.rows[0];  // Return the updated task
  }
};

module.exports = Task;
