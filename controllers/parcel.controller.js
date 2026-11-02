/**
 * controllers/parcel.controller.js
 * -------------------------------------------------------------
 * Express Controller handling business logic for ParcelPulse CRUD.
 * Contains 5 standard REST operations:
 *  1. createParcel   (POST)
 *  2. getAllParcels  (GET)
 *  3. getParcelById  (GET :id)
 *  4. updateParcel   (PUT :id)
 *  5. deleteParcel   (DELETE :id)
 * -------------------------------------------------------------
 */

const Parcel = require('../models/parcel.model');

/**
 * 1. CREATE: Log a new courier package arriving at campus gate
 * Route: POST /api/parcels
 * Status: 201 Created on success
 */
exports.createParcel = async (req, res) => {
  try {
    const { studentName, roomOrHostel, courierService, shelfCode, pickupStatus } = req.body;

    const newParcel = new Parcel({
      studentName,
      roomOrHostel,
      courierService,
      shelfCode,
      pickupStatus: pickupStatus || 'At Gate'
    });

    const savedParcel = await newParcel.save();
    return res.status(201).json(savedParcel);
  } catch (error) {
    return res.status(400).json({
      error: 'Failed to log package',
      details: error.message
    });
  }
};

/**
 * 2. READ ALL: Fetch all logged packages, newest first
 * Route: GET /api/parcels
 * Status: 200 OK
 */
exports.getAllParcels = async (req, res) => {
  try {
    // Sort by createdAt descending (-1) so latest deliveries appear at the top
    const parcels = await Parcel.find().sort({ createdAt: -1 });
    return res.status(200).json(parcels);
  } catch (error) {
    return res.status(500).json({
      error: 'Failed to retrieve parcels',
      details: error.message
    });
  }
};

/**
 * 3. READ ONE: Fetch single parcel record by MongoDB _id
 * Route: GET /api/parcels/:id
 * Status: 200 OK or 404 Not Found
 */
exports.getParcelById = async (req, res) => {
  try {
    const { id } = req.params;
    const parcel = await Parcel.findById(id);

    if (!parcel) {
      return res.status(404).json({ error: `Package with ID ${id} not found` });
    }

    return res.status(200).json(parcel);
  } catch (error) {
    return res.status(400).json({
      error: 'Invalid parcel ID format or query failure',
      details: error.message
    });
  }
};

/**
 * 4. UPDATE: Update parcel details or pickupStatus by _id
 * Route: PUT /api/parcels/:id
 * Options:
 *   new: true -> returns the newly updated document instead of old one
 *   runValidators: true -> enforces Mongoose schema validations during update
 * Status: 200 OK or 404 Not Found
 */
exports.updateParcel = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedParcel = await Parcel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedParcel) {
      return res.status(404).json({ error: `Package with ID ${id} not found` });
    }

    return res.status(200).json(updatedParcel);
  } catch (error) {
    return res.status(400).json({
      error: 'Failed to update package',
      details: error.message
    });
  }
};

/**
 * 5. DELETE: Remove parcel log from database by _id
 * Route: DELETE /api/parcels/:id
 * Status: 200 OK or 404 Not Found
 */
exports.deleteParcel = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedParcel = await Parcel.findByIdAndDelete(id);

    if (!deletedParcel) {
      return res.status(404).json({ error: `Package with ID ${id} not found` });
    }

    return res.status(200).json({
      message: 'Parcel record deleted successfully',
      id: deletedParcel._id,
      studentName: deletedParcel.studentName
    });
  } catch (error) {
    return res.status(400).json({
      error: 'Failed to delete package',
      details: error.message
    });
  }
};
