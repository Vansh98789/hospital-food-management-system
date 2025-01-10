// Get JWT token from localStorage
export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  // Save JWT token to localStorage
  export const setStoredToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  // Remove JWT token from localStorage
  export const removeStoredToken = () => {
    localStorage.removeItem('token');
  };
  
  // Check if the user is authenticated based on token presence
  export const isAuthenticated = () => {
    const token = getToken();
    return token ? true : false;
  };
  
  // Decode the JWT token (you may need to install `jwt-decode` or use a custom decoder)
  import jwt_decode from 'jwt-decode';
  
  // Decode the JWT token to get user data
  export const decodeToken = (token) => {
    try {
      return jwt_decode(token);
    } catch (error) {
      return null;
    }
  };
  