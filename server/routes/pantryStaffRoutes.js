// /routes/pantryStaffRoutes.js
const express = require('express');
const router = express.Router();
const pantryStaffController = require('../controllers/pantryStaffController');
const authMiddleware = require('../middleware/authMiddleware');  // Protect routes with JWT auth

// Routes for managing pantry staff
router.post('/', authMiddleware, pantryStaffController.createPantryStaff);  // Add new pantry staff
router.get('/', authMiddleware, pantryStaffController.getAllPantryStaff);  // Get all pantry staff
router.put('/:id', authMiddleware, pantryStaffController.updatePantryStaff);  // Update pantry staff details
router.delete('/:id', authMiddleware, pantryStaffController.deletePantryStaff);  // Delete pantry staff

module.exports = router;
