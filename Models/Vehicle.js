const mongoose = require('mongoose');
const VehicleType = require('./VehicleType'); // Import the VehicleType schema

const vehicleSchema = new mongoose.Schema({
 
  image: String,
  name: String,
  pricePerDay: Number,
  vehicleType: {
    type: mongoose.Schema.Types.ObjectId, // Change vehicleType to ObjectId
    ref: 'VehicleType', // Reference the VehicleType schema
    required: true,
  },
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;