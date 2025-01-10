// Error Handling Middleware
const errorMiddleware = (err, req, res, next) => {
    console.error(err); // Log the error for debugging purposes
    
    // Handle known errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    
    // Generic error handler
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
  };
  
  module.exports = errorMiddleware;
  