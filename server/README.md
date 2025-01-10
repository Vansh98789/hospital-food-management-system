backend functionality req=>
Implement authentication (JWT or OAuth).
CRUD operations for managing patient details.
CRUD operations for managing food/diet charts.
Assigning tasks to the inner pantry.
Marking deliveries as complete.


implimentation=>

Authentication-
=>Login (JWT Authentication)  :POST /auth/login

Patient Management-
=>Create a Patient  :POST /api/patients
=>Get All Patients  :GET /api/patients
=>Get Patient by ID  :GET /api/patients/:id
=>Update Patient Details  :PUT /api/patients/:id
=>Delete Patient  :DELETE /api/patients/:id

Diet Chart Management-
=>Create Diet Chart  :POST /api/diet-charts
=>Get Diet Chart by Patient ID  :GET /api/diet-charts/:patient_id
=>Update Diet Chart  :PUT /api/diet-charts/:id
=>Delete Diet Chart  :DELETE /api/diet-charts/:id

Pantry Staff Management-
=>Create Pantry Staff  :POST /api/pantry-staff
=>Get All Pantry Staff  :GET /api/pantry-staff
=>Update Pantry Staff  :PUT /api/pantry-staff/:id
=>Delete Pantry Staff  :DELETE /api/pantry-staff/:id

Meal Delivery Task Management-
=> Create Meal Task  :POST /api/tasks
=> Get All Tasks  :GET /api/tasks
=>Get Task by ID  :GET /api/tasks/:id
=>Update Task Status( Mark as Delivered)  :PUT /api/tasks/:id





/server
  ├── /config                    # Configuration files (e.g., DB, JWT, environment variables)
  │   ├── db.js                  # Database connection (PostgreSQL)
  │   ├── jwtConfig.js           # JWT configuration (secret, options, etc.)
  │   └── config.js              # Other configuration (environment variables)
  │
  ├── /controllers               # All the controllers for your endpoints
  │   ├── authController.js      # Handle login, registration, JWT token creation
  │   ├── patientController.js   # Handle CRUD operations for patients
  │   ├── dietChartController.js # Handle CRUD operations for diet charts
  │   ├── pantryStaffController.js # Handle CRUD operations for pantry staff
  │   └── taskController.js      # Handle meal task management (assign, update status)
  │
  ├── /models                    # Database models
  │   ├── patientModel.js        # Patient model (defines schema, validation)
  │   ├── dietChartModel.js      # Diet chart model (defines schema, validation)
  │   ├── pantryStaffModel.js    # Pantry staff model
  │   ├── deliveryPersonnelModel.js # Delivery personnel model
  │   └── taskModel.js           # Meal task model
  │
  ├── /routes                    # API routes
  │   ├── authRoutes.js          # Authentication routes (login)
  │   ├── patientRoutes.js       # Patient management routes
  │   ├── dietChartRoutes.js     # Diet chart management routes
  │   ├── pantryStaffRoutes.js   # Pantry staff management routes
  │   └── taskRoutes.js          # Meal task management routes
  │
  ├── /middleware                # Custom middleware
  │   ├── authMiddleware.js      # JWT authentication middleware (verify token)
  │   ├── errorMiddleware.js     # Handle and log errors in API requests
  │   └── validateMiddleware.js  # Validation middleware for input data
  │
  ├── /utils                     # Utility functions or helpers
  │   ├── generateToken.js       # Helper function to generate JWT tokens
  │   ├── hashPassword.js        # Helper function to hash passwords
  │   └── validateInput.js       # Helper for input validation
  │
  ├── /validators                # Input validation schemas (using something like Joi)
  │   ├── patientValidator.js    # Validation for patient-related data
  │   ├── dietChartValidator.js  # Validation for diet chart data
  │   ├── pantryStaffValidator.js # Validation for pantry staff data
  │   └── taskValidator.js       # Validation for task-related data
  │
  ├── /services                  # Service layer (Optional, for business logic)
  │   └── taskService.js         # Task management logic (separate from controllers)
  │
  ├── /logs                      # Logs for server, errors, etc.
  │   └── server.log             # Example log file
  │
  ├── server.js                  # Entry point for your Express app
  ├── package.json               # Project metadata and dependencies
  └── .env                       # Environment variables (database URL, JWT secret, etc.)
