const mongoose = require("mongoose");
const objectId=mongoose.Schema.Types.ObjectId;

const propertyModel=new mongoose.Schema({
    organizationId:{
        type:objectId,
        ref:'Organization',
        required:true
    },
   
    propertyName:{
        type:String,
        unique:true,
        required:true
    },
    city:{
        type:String,
        required:true
        },
    state:{
       type:String,
       required:true
        },
    country:{
        type:String,
        required:true
    },
   
    regionId:[{type:objectId,ref:"region"}],
    fieldId:[{type:objectId,ref:"field"}],
},{timestamps:true})

module.exports=mongoose.model("property",propertyModel);
