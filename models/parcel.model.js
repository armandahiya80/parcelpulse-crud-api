/**
 * models/parcel.model.js
 * -------------------------------------------------------------
 * Mongoose Data Model for ParcelPulse
 * Represents courier packages received at the campus security gate.
 * -------------------------------------------------------------
 */

const mongoose = require('mongoose');

// Define Schema for a Parcel
const parcelSchema = new mongoose.Schema(
  {
    // Name of the student receiving the delivery
    studentName: {
      type: String,
      required: [true, 'Student name is required'],
      trim: true
    },

    // Hostel block & room number (e.g., "Block B - 304")
    roomOrHostel: {
      type: String,
      required: [true, 'Hostel block or room number is required'],
      trim: true
    },

    // Courier vendor handling the shipment
    courierService: {
      type: String,
      required: [true, 'Courier service name is required'],
      enum: {
        values: ['Amazon', 'Flipkart', 'BlueDart', 'Delhivery', 'Myntra'],
        message: '{VALUE} is not a supported courier service'
      }
    },

    // Physical holding shelf/rack location at campus gate (e.g., "Rack-A2")
    shelfCode: {
      type: String,
      required: [true, 'Shelf code is required'],
      trim: true
    },

    // Current delivery status: defaults to "At Gate", toggles to "Collected"
    pickupStatus: {
      type: String,
      default: 'At Gate',
      enum: {
        values: ['At Gate', 'Collected'],
        message: 'Status must be either "At Gate" or "Collected"'
      }
    }
  },
  {
    // Automatically creates 'createdAt' and 'updatedAt' ISO timestamps
    timestamps: true
  }
);

// Compile Schema into Mongoose Model and export
const Parcel = mongoose.model('Parcel', parcelSchema);

module.exports = Parcel;
