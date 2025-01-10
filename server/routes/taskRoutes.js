// /routes/taskRoutes.js
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');  // Protect routes with JWT auth

// Routes for managing meal tasks
router.post('/', authMiddleware, taskController.createTask);  // Create a new meal task
router.get('/', authMiddleware, taskController.getAllTasks);  // Get all tasks
router.put('/:id', authMiddleware, taskController.updateTaskStatus);  // Update task status (mark as delivered)
router.delete('/:id', authMiddleware, taskController.deleteTask);  // Delete task

module.exports = router;
