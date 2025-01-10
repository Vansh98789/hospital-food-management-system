// /validators/pantryStaffValidator.js
const Joi = require('joi');

// Pantry Staff validation schema
const pantryStaffValidator = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name should be at least 3 characters long',
    'string.max': 'Name should not exceed 100 characters',
  }),
  contactInfo: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'string.empty': 'Contact Information is required',
    'string.pattern.base': 'Contact Information must be a 10-digit number',
  }),
  location: Joi.string().min(3).required().messages({
    'string.empty': 'Location is required',
    'string.min': 'Location should be at least 3 characters long',
  }),
});

module.exports = pantryStaffValidator;
