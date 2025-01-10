const pool = require('../config/db');  // Import the PostgreSQL pool

// POST request to create a meal task
const createTask = async (req, res) => {
  const { patient_id, meal_type, delivery_personnel_id, task_status, instructions } = req.body;

  try {
    // Validate input fields
    if (!patient_id || !meal_type || !delivery_personnel_id) {
      return res.status(400).json({ message: 'Patient ID, Meal Type, and Delivery Personnel ID are required' });
    }

    // Get a client from the pool
    const client = await pool.connect();

    // Insert meal task into the database
    const result = await client.query(
      'INSERT INTO tasks (patient_id, meal_type, task_status, delivery_personnel_id, instructions) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [patient_id, meal_type, task_status || 'Pending', delivery_personnel_id, instructions || '']
    );

    const newTask = result.rows[0];
    client.release();  // Release the client back to the pool

    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET request to get all tasks
const getAllTasks = async (req, res) => {
  try {
    // Get a client from the pool
    const client = await pool.connect();

    // Query to get all tasks
    const result = await client.query('SELECT * FROM tasks');

    client.release();  // Release the client back to the pool

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// GET request to get tasks by patient ID
const getTasksByPatientId = async (req, res) => {
  const { patient_id } = req.params;

  try {
    // Get a client from the pool
    const client = await pool.connect();

    // Query to get tasks for the patient
    const result = await client.query('SELECT * FROM tasks WHERE patient_id = $1', [patient_id]);

    client.release();  // Release the client back to the pool

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this patient' });
    }

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// PUT request to update task status (mark as delivered or completed)
const updateTaskStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  try {
    // Get a client from the pool
    const client = await pool.connect();

    // Update the task status
    const result = await client.query(
      'UPDATE tasks SET task_status = $1, completed_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );

    client.release();  // Release the client back to the pool

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// DELETE request to delete a task
const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    // Get a client from the pool
    const client = await pool.connect();

    // Delete the task
    const result = await client.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);

    client.release();  // Release the client back to the pool

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { createTask, getAllTasks, getTasksByPatientId, updateTaskStatus, deleteTask };
