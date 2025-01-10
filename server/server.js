const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Import routes
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const dietChartRoutes = require('./routes/dietChartRoutes');
const pantryStaffRoutes = require('./routes/pantryStaffRoutes');
const taskRoutes = require('./routes/taskRoutes');

const db = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Middleware setup
app.use(cors({
  origin: 'http://localhost:5173',   // Allow requests from the frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Specify allowed methods
  credentials: true,  // Allow cookies or credentials to be included in the request
}));

//app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json());  // Parse JSON bodies
app.use(morgan('dev'));  // HTTP request logger

// Test database connection
db.query('SELECT 1')  // Simple query to check database connection
  .then(() => {
    console.log('Database connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err.message);
  });

// Set up routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/diet-charts', dietChartRoutes);
app.use('/api/pantry-staff', pantryStaffRoutes);
app.use('/api/tasks', taskRoutes);

// Handle basic requests
app.get('/', (req, res) => {
  res.send('Welcome to the Hospital Food Delivery Management API');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Set the server to listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
