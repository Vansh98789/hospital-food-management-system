// /models/deliveryPersonnelModel.js
const { Pool } = require('pg');
const pool = require('../config/db');  // Use your db connection from config

const DeliveryPersonnel = {
  // Create new delivery personnel
  createDeliveryPersonnel: async (personnelData) => {
    const query = `
      INSERT INTO delivery_personnel (name, contact_info, vehicle_info)
      VALUES ($1, $2, $3)
      RETURNING *`;
    const values = [
      personnelData.name,
      personnelData.contact_info,
      personnelData.vehicle_info
    ];

    const result = await pool.query(query, values);
    return result.rows[0];  // Return the created delivery personnel
  },

  // Get all delivery personnel
  getAllDeliveryPersonnel: async () => {
    const query = 'SELECT * FROM delivery_personnel';
    const result = await pool.query(query);
    return result.rows;  // Return all delivery personnel
  },

  // Update delivery personnel
  updateDeliveryPersonnel: async (id, personnelData) => {
    const query = `
      UPDATE delivery_personnel 
      SET name = $1, contact_info = $2, vehicle_info = $3
      WHERE id = $4
      RETURNING *`;
    const values = [
      personnelData.name,
      personnelData.contact_info,
      personnelData.vehicle_info,
      id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];  // Return the updated delivery personnel
  },

  // Delete delivery personnel
  deleteDeliveryPersonnel: async (id) => {
    const query = 'DELETE FROM delivery_personnel WHERE id = $1 RETURNING *';
    const result = await pool.query(query, [id]);
    return result.rows[0];  // Return the deleted delivery personnel
  }
};

module.exports = DeliveryPersonnel;
