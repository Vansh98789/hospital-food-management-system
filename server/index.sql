-- Create the 'patients' table
CREATE TABLE patients (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(100),
  age INT,
  gender VARCHAR(10),
  room_number INT,
  bed_number INT,
  floor_number INT,
  diseases TEXT,
  allergies TEXT,
  contact_info VARCHAR(100),
  emergency_contact VARCHAR(100),
  additional_info TEXT
);

-- Create the 'diet_charts' table
CREATE TABLE diet_charts (
  id SERIAL PRIMARY KEY,
  patient_id INT REFERENCES patients(id) ON DELETE CASCADE, -- Foreign key reference to 'patients' table
  morning_meal TEXT,
  evening_meal TEXT,
  night_meal TEXT,
  morning_ingredients TEXT,
  evening_ingredients TEXT,
  night_ingredients TEXT,
  instructions TEXT,  -- Additional instructions like "low sugar", "no salt", etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'pantry_staff' table
CREATE TABLE pantry_staff (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  contact_info VARCHAR(100),
  location VARCHAR(100),
  role VARCHAR(50), -- e.g., "Chef", "Cook", "Assistant"
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'delivery_personnel' table
CREATE TABLE delivery_personnel (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  contact_info VARCHAR(100),
  assigned_area VARCHAR(100),  -- Area or floor to which the delivery personnel is assigned
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the 'tasks' table (Meal delivery tasks)
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  patient_id INT REFERENCES patients(id) ON DELETE CASCADE, -- Foreign key reference to 'patients' table
  meal_type VARCHAR(10), -- E.g., "morning", "evening", "night"
  task_status VARCHAR(20) DEFAULT 'Pending', -- Task status (e.g., "Pending", "Completed")
  delivery_personnel_id INT REFERENCES delivery_personnel(id), -- Foreign key to delivery personnel
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Timestamp for when the task was assigned
  completed_at TIMESTAMP, -- Timestamp for when the task was completed
  instructions TEXT, -- Meal instructions like "low sugar", etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
