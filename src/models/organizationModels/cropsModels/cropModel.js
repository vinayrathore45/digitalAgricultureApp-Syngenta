const mongoose = require("mongoose");


const cropModel=new mongoose.Schema({

  cropName:{
    type:String,
    trim:true,
    required:true,
    unique:true
},
  cropSeason:{
    type: String,
    enum: ['fall','winter','spring','summer']
  },
  isDeleted:{type:Boolean,default:false}

},{timestamps:true})

module.exports=mongoose.model("crop",cropModel)