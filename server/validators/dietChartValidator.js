// /validators/dietChartValidator.js
const Joi = require('joi');

// Diet Chart validation schema
const dietChartValidator = Joi.object({
  patientId: Joi.string().required().messages({
    'string.empty': 'Patient ID is required',
  }),
  morningMeal: Joi.object({
    meal: Joi.string().min(3).required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    instructions: Joi.string().optional(),
  }).required(),
  eveningMeal: Joi.object({
    meal: Joi.string().min(3).required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    instructions: Joi.string().optional(),
  }).required(),
  nightMeal: Joi.object({
    meal: Joi.string().min(3).required(),
    ingredients: Joi.array().items(Joi.string()).required(),
    instructions: Joi.string().optional(),
  }).required(),
});

module.exports = dietChartValidator;
