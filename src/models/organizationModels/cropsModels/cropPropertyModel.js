const mongoose = require("mongoose");
const objectId=mongoose.Schema.Types.ObjectId

const cropPropertyModel=new mongoose.Schema({
  
  propertyId:{
    type:objectId,
    required:true,
    ref:"property"
},


},{timestamps:true})

module.exports=mongoose.model("cropProperty",cropPropertyModel) 