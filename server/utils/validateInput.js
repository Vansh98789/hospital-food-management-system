// /utils/validateInput.js
const Joi = require('joi');

// Utility function to validate an email address using Joi
const validateEmail = (email) => {
  const schema = Joi.string().email().required();
  const { error } = schema.validate(email); // Validate email
  return error; // Return the validation error if there is one
};

// Utility function to check if a string is empty
const isEmpty = (str) => {
  return !str || str.trim().length === 0;
};

// Utility function to validate a generic input with custom Joi schema
const validateInput = (data, schema) => {
  const { error } = schema.validate(data);
  return error; // Return the validation error if there is one
};

module.exports = { validateEmail, isEmpty, validateInput };
