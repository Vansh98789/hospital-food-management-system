// /validators/taskValidator.js
const Joi = require('joi');

// Task validation schema
const taskValidator = Joi.object({
  patientId: Joi.string().required().messages({
    'string.empty': 'Patient ID is required',
  }),
  taskType: Joi.string().valid('Morning', 'Evening', 'Night').required().messages({
    'string.empty': 'Task Type is required',
    'string.valid': 'Task Type must be one of Morning, Evening, or Night',
  }),
  assignedTo: Joi.string().required().messages({
    'string.empty': 'Assigned Staff ID is required',
  }),
  deliveryStatus: Joi.string().valid('Pending', 'In Progress', 'Delivered').required().messages({
    'string.empty': 'Delivery Status is required',
    'string.valid': 'Delivery Status must be one of Pending, In Progress, or Delivered',
  }),
  deliveryNotes: Joi.string().optional(),  // Optional delivery notes
});

module.exports = taskValidator;
