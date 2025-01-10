// /routes/patientRoutes.js
const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const authMiddleware = require('../middleware/authMiddleware');  // Protect routes with JWT auth

// Routes for managing patients
router.post('/', authMiddleware, patientController.createPatient);  // Create a new patient
router.get('/', authMiddleware, patientController.getAllPatients);  // Get all patients
router.get('/:id', authMiddleware, patientController.getPatientById);  // Get patient by ID
router.put('/:id', authMiddleware, patientController.updatePatient);  // Update patient details
router.delete('/:id', authMiddleware, patientController.deletePatient);  // Delete patient

module.exports = router;
