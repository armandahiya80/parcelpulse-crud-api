/**
 * routes/parcel.route.js
 * -------------------------------------------------------------
 * Express Router defining API endpoints for parcel CRUD actions.
 * Base path: /api/parcels
 * -------------------------------------------------------------
 */

const express = require('express');
const router = express.Router();
const parcelController = require('../controllers/parcel.controller');

// CREATE: POST /api/parcels - Log new package
router.post('/', parcelController.createParcel);

// READ ALL: GET /api/parcels - Retrieve all packages
router.get('/', parcelController.getAllParcels);

// READ ONE: GET /api/parcels/:id - Retrieve package by MongoDB _id
router.get('/:id', parcelController.getParcelById);

// UPDATE: PUT /api/parcels/:id - Update package by MongoDB _id
router.put('/:id', parcelController.updateParcel);

// DELETE: DELETE /api/parcels/:id - Delete package by MongoDB _id
router.delete('/:id', parcelController.deleteParcel);

module.exports = router;
