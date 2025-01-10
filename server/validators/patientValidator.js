// /validators/patientValidator.js
const Joi = require('joi');

// Patient validation schema
const patientValidator = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Name is required',
    'string.min': 'Name should be at least 3 characters',
    'string.max': 'Name should be less than 100 characters',
  }),
  diseases: Joi.array().items(Joi.string().min(3)).required().messages({
    'array.base': 'Diseases should be an array of strings',
    'array.items': 'Each disease should be a string',
    'array.min': 'At least one disease should be provided',
  }),
  allergies: Joi.array().items(Joi.string().min(3)),
  roomNumber: Joi.string().required().messages({
    'string.empty': 'Room Number is required',
  }),
  bedNumber: Joi.string().required().messages({
    'string.empty': 'Bed Number is required',
  }),
  floorNumber: Joi.number().min(1).max(10).required().messages({
    'number.base': 'Floor Number should be a number',
    'number.min': 'Floor Number should be at least 1',
    'number.max': 'Floor Number should be less than or equal to 10',
  }),
  age: Joi.number().min(0).required().messages({
    'number.base': 'Age should be a valid number',
    'number.min': 'Age should be a positive number',
  }),
  gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
    'string.empty': 'Gender is required',
    'string.valid': 'Gender must be one of Male, Female, or Other',
  }),
  contactInfo: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'string.empty': 'Contact Information is required',
    'string.pattern.base': 'Contact Information must be a 10-digit number',
  }),
  emergencyContact: Joi.string().pattern(/^[0-9]{10}$/),
});

module.exports = patientValidator;
