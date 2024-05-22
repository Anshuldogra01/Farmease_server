const express = require('express');
const router = express.Router();
const VehicleType = require('../Models/VehicleType'); // Import the VehicleType model
const Vehicle = require('../Models/Vehicle');
const Svehicle=require('../Models/Svehicle'); // Import the Vehicle model




//add vehicle types 
   router.post('/v', async (req, res) => {
    const newVehicleType = new VehicleType(req.body);
  
    try {
      const savedVehicleType = await newVehicleType.save();
      res.status(201).json(savedVehicleType);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });


// add vehicles for a specific type !!
   router.post('/vehicless', async (req, res) => {
    try {
      // Extract data from the request body
      const { image, name, pricePerDay, vehicleTypeId } = req.body;
  
      // Check if vehicle type ID is provided
      if (!vehicleTypeId) {
        return res.status(400).json({ message: 'Vehicle type ID is required' });
      }
  
      // Find the vehicle type by ID
      const vehicleType = await VehicleType.findById(vehicleTypeId);
  
      if (!vehicleType) {
        return res.status(404).json({ message: 'Vehicle type not found' });
      }
  
      // Create a new vehicle object
      const newVehicle = new Vehicle({
        image,
        name,
        pricePerDay,
        vehicleType: vehicleType._id // Use the ObjectId directly
      });
  
      // Save the new vehicle to the database
      const savedVehicle = await newVehicle.save();
  
      res.status(201).json({ message: 'Vehicle created successfully', vehicle: savedVehicle });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });

  
router.post('/vehicl/:id', async (req, res) => {
  try {
    const vehicleId = req.params.id;

    // Check if the vehicleId is a valid ObjectId
    if (!ObjectId.isValid(vehicleId)) {
      return res.status(400).json({ message: 'Invalid vehicle ID' });
    }

    const { image, name, MRP, Product_of_Origin, Description } = req.body;

    const sVehicleData = {
      image,
      name,
      MRP,
      Product_of_Origin,
      Description,
      Vehicle: new ObjectId(vehicleId),
    };

    const sVehicleInstance = new Svehicle(sVehicleData);

    await sVehicleInstance.save();

    res.status(201).json({ message: 'sVehicle added successfully', sVehicle: sVehicleInstance });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});

  
//get  all vehicle types 
router.get('/vehicleTypes', async (req, res) => { try { const vehicleTypes = await VehicleType.find(); 
  res.json(vehicleTypes); } catch (err) { res.status(500).json({ message: err.message });}});



 //Get specific vehicle by id !!!
  router.get('/:id', async (req, res) => {
    try {
      const vehicleId = req.params.id;
      const vehicle = await Vehicle.findById(vehicleId);
  
      if (!vehicle) {
        return res.status(404).json({ message: 'Vehicle not found' });
      }
  
      res.status(200).json({ vehicle });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });


 //get the vehicles for a specific type !!!
  const ObjectId = require('mongoose').Types.ObjectId;
  router.get('/v/:id', async (req, res) => {
    try {
      const vehicleTypeId = req.params.id;
  
      // Check if the vehicleTypeId is a valid ObjectId
      if (!ObjectId.isValid(vehicleTypeId)) {
        return res.status(400).json({ message: 'Invalid vehicle type ID' });
      }
  
      const vehicles = await Vehicle.find({ vehicleType: new ObjectId(vehicleTypeId) });
  
      if (vehicles.length === 0) {
        return res.status(404).json({ message: 'No vehicles found with the specified vehicle type ID' });
      }
  
      res.status(200).json({ vehicles });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });


/// get detailed explaination for a vehicle !!!
  router.get('/sv/:id', async (req, res) => {
    try {
      const sVehicleId = req.params.id;
      const sVehicle = await Svehicle.findById(sVehicleId);
  
      if (!sVehicle) {
        return res.status(404).json({ message: 'sVehicle not found' });
      }
  
      res.status(200).json({ sVehicle });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error', error: error.message });
    }
  });
module.exports = router;

/*
                                   6 apis
1. Add vehicle types 
    http://localhost:3003/vehicles/v

2. Get vehicle types   
   http://localhost:3003/vehicles/vehicleTypes
   
3.Add specific vehicle for each type    
   http://localhost:3003/vehicles/vehicless

4. get specific vehicle for each type    
    http://localhost:3003/vehicles/v/:id

5. add specific details for a vehicle 
    http://localhost:3003/vehicles/vehicl/:id   

6. get details of a single vehicle 
    http://localhost:3003/vehicles/sv/:id   
    
7. to get a vehicle by id in a specific type 
      http://localhost:3003/vehicles/:id
   */