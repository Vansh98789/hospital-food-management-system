// routes/dietChartRoutes.js
const express = require('express');
const router = express.Router();
const dietChartController = require('../controllers/dietChartController');
const authMiddleware = require('../middleware/authMiddleware');  // Protect routes with JWT auth

// Routes for managing diet charts
router.post('/', authMiddleware, dietChartController.createDietChart);  // Create a new diet chart
router.get('/:patient_id', authMiddleware, dietChartController.getDietChartByPatientId);  // Get diet charts by patient ID
router.get('/', authMiddleware, dietChartController.getAllDietCharts); // Get all diet charts
router.put('/:id', authMiddleware, dietChartController.updateDietChart);  // Update diet chart
router.delete('/:id', authMiddleware, dietChartController.deleteDietChart);  // Delete diet chart

module.exports = router;
