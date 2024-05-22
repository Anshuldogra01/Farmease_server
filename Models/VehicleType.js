const mongoose = require('mongoose');

const vehicleTypeSchema = new mongoose.Schema({
   // Add _id field
  name: String,
  image: String,
  priceRange: {
    min: Number,
    max: Number
  }
});




const VehicleType = mongoose.model('VehicleType', vehicleTypeSchema);

module.exports = VehicleType;