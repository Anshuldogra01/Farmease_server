const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const VehicleType = require('./Models/VehicleType');
const Vehicle = require('./Models/Vehicle');
const svehicle=require('./Models/Svehicle');
const vehicleRoutes = require('./Routes/vehicleRoutes');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/Vehicles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
// Create some vehicle types


app.use('/vehicles', vehicleRoutes);



const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
