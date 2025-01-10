// /utils/hashPassword.js
const bcrypt = require('bcryptjs');

// Function to hash a password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
  const hashedPassword = await bcrypt.hash(password, salt); // Hash the password
  return hashedPassword;
};

// Function to compare the entered password with the stored hashed password
const comparePassword = async (enteredPassword, hashedPassword) => {
  const isMatch = await bcrypt.compare(enteredPassword, hashedPassword);
  return isMatch;
};

module.exports = { hashPassword, comparePassword };
