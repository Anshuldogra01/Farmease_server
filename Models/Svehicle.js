const mongoose = require('mongoose');
const Vehicle= require('./Vehicle');

const svehicleSchema= new mongoose.Schema({
    image:String,
    name:String,
    MRP:Number,
    Product_of_Origin:String,
    Description:String,
    Vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vehicle',
        required: true,
    },
});

const sVehicle=mongoose.model('svehicle',svehicleSchema);

module.exports=sVehicle;