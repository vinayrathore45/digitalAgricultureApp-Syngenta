const mongoose = require("mongoose");
const objectId=mongoose.Schema.Types.ObjectId

const fieldModel=new mongoose.Schema({
    length:{
        type:String
    },
    width:{
        type:String
    },
    address:{
       plotNo:{
        type:String
    },
       landMark:{
        type:String
    },
       pinCodeNo:{
        type:Number
    },
  },
  
  cropCycleHistory:{
     cropCycleID:{
        type:objectId,
        ref:"cropCycleField"
    }

  },
  avgWaterAvailable:{
    type:String,
    trim:true,
    required:true
},
 
  regionId:{
    type:objectId,
    required:true,
    ref:"region"
},



},{timestamps:true})

module.exports=mongoose.model("field",fieldModel)
