/**
 * index.js
 * -------------------------------------------------------------
 * ParcelPulse — Campus Courier & Package Gate Tracker
 * Express server entry point, MongoDB connection & route registration.
 * -------------------------------------------------------------
 */

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const parcelRoutes = require('./routes/parcel.route');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware for parsing JSON and form submissions
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend assets (HTML, CSS) from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

// Mount API routes
app.use('/api/parcels', parcelRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;
  res.status(isDbConnected ? 200 : 503).json({
    status: isDbConnected ? 'UP' : 'DATABASE_DISCONNECTED',
    app: 'ParcelPulse',
    database: isDbConnected ? 'Connected to MongoDB Atlas' : 'Connecting or IP Not Whitelisted',
    readyState: mongoose.connection.readyState,
    timestamp: new Date().toISOString()
  });
});

// Connect to MongoDB Atlas
if (!MONGO_URI) {
  console.error('❌ ERROR: MONGO_URI is not defined in .env file!');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000
  })
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas successfully!');
  })
  .catch((err) => {
    console.error('❌ MongoDB Atlas connection error:', err.message);
    if (err.message.includes('SSL alert') || err.message.includes('tlsv1 alert')) {
      console.warn('💡 Tip: "SSL alert number 80" means your current IP is not in MongoDB Atlas IP Access List.');
      console.warn('   Go to cloud.mongodb.com -> Network Access -> Add IP Address -> "Allow Access From Anywhere (0.0.0.0/0)".');
    }
  });

// Start Express server
app.listen(PORT, () => {
  console.log(`🚀 ParcelPulse server running at: http://localhost:${PORT}`);
  console.log(`📦 Parcel API available at: http://localhost:${PORT}/api/parcels`);
});
