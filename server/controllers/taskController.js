const db = require('../config/db');  // Import the db client (db.js)

// POST request to create a meal task
const createTask = async (req, res) => {
  const { patient_id, meal_type, delivery_personnel_id, task_status, instructions } = req.body;

  try {
    // Validate input fields
    if (!patient_id || !meal_type || !delivery_personnel_id) {
      return res.status(400).json({ message: 'Patient ID, Meal Type, and Delivery Personnel ID are required' });
    }

    // Insert meal task into the database
    const result = await db.query(
      'INSERT INTO tasks (patient_id, meal_type, task_status, delivery_personnel_id, instructions) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [patient_id, meal_type, task_status || 'Pending', delivery_personnel_id, instructions || '']
    );

    const newTask = result.rows[0];
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// GET request to get all tasks
const getAllTasks = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM tasks');
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
    const result = await db.query('SELECT * FROM tasks WHERE patient_id = $1', [patient_id]);
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
    const result = await db.query(
      'UPDATE tasks SET status = $1, completed_at = NOW() WHERE id = $2 RETURNING *',
      [status, id]
    );
    
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
    const result = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    
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
