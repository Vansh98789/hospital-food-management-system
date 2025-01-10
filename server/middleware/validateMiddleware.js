const Joi = require('joi');

// Middleware to validate the input data for creating or updating a patient
const validatePatientData = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    age: Joi.number().integer().min(0).required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    room_number: Joi.number().integer().required(),
    bed_number: Joi.number().integer().required(),
    floor_number: Joi.number().integer().required(),
    diseases: Joi.string().optional(),
    allergies: Joi.string().optional(),
    contact_info: Joi.string().optional(),
    emergency_contact: Joi.string().optional(),
    additional_info: Joi.string().optional(),
  });

  const { error } = schema.validate(req.body); // Validate request body
  if (error) {
    return res.status(400).json({ message: error.details[0].message }); // Return validation error
  }
  
  next(); // Proceed to the next middleware or route handler
};

module.exports = { validatePatientData };
