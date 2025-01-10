// Validate email format
export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };
  
  // Validate password strength (at least 8 characters, 1 uppercase, 1 number)
  export const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };
  
  // Check if the required fields are filled out
  export const validateRequiredFields = (fields) => {
    for (let field in fields) {
      if (!fields[field]) {
        return `${field} is required`;
      }
    }
    return null;  // No validation errors
  };
  