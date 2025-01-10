// /services/taskService.js
const { createTaskQuery, getAllTasksQuery, getTaskByIdQuery, updateTaskStatusQuery } = require('../models/taskModel');
const { getPatientByIdQuery } = require('../models/patientModel');
const { getPantryStaffByIdQuery } = require('../models/pantryStaffModel');
const { getDeliveryPersonnelByIdQuery } = require('../models/deliveryPersonnelModel');

// Service to create a meal task
const createTask = async (taskData) => {
  try {
    // Check if the patient exists
    const patient = await getPatientByIdQuery(taskData.patientId);
    if (!patient) {
      throw new Error('Patient not found');
    }

    // Check if the pantry staff exists
    const pantryStaff = await getPantryStaffByIdQuery(taskData.assignedTo);
    if (!pantryStaff) {
      throw new Error('Pantry staff not found');
    }

    // Create the meal task in the database
    const task = await createTaskQuery(taskData);
    return task;
  } catch (error) {
    throw new Error(`Error creating task: ${error.message}`);
  }
};

// Service to get all meal tasks
const getAllTasks = async () => {
  try {
    const tasks = await getAllTasksQuery();
    return tasks;
  } catch (error) {
    throw new Error(`Error fetching tasks: ${error.message}`);
  }
};

// Service to get a specific task by ID
const getTaskById = async (taskId) => {
  try {
    const task = await getTaskByIdQuery(taskId);
    if (!task) {
      throw new Error('Task not found');
    }
    return task;
  } catch (error) {
    throw new Error(`Error fetching task by ID: ${error.message}`);
  }
};

// Service to update the status of a meal task
const updateTaskStatus = async (taskId, status) => {
  try {
    // Validate the status
    const validStatuses = ['Pending', 'In Progress', 'Delivered'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    // Update the task status
    const updatedTask = await updateTaskStatusQuery(taskId, status);
    if (!updatedTask) {
      throw new Error('Task not found');
    }

    return updatedTask;
  } catch (error) {
    throw new Error(`Error updating task status: ${error.message}`);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTaskStatus,
};
