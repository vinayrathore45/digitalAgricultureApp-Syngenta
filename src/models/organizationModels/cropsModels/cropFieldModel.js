const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId

const cropCycleFieldModel=new mongoose.Schema({
 
  cropId:[{type:objectId,ref:"cropModel"}],

  cropPropertyId:{
    type:objectId,
    ref:"cropProperty"},
  fieldId:{
    type:objectId,
    ref:"field"
}

},{timestamps:true})
 
module.exports=mongoose.model("cropCycleField",cropCycleFieldModel)