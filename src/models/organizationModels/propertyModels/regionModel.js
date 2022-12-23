const mongoose = require("mongoose");


const regionModel=new mongoose.Schema({
    
  avgTemperature:{
    type:String
},
  avgMoisture:{
    type:String
},
  
 climate:{
    type:String,
    enum:["dry","normal","moisture"]
},

  // propertyID
  
},{timestamps:true})

module.exports=mongoose.model("region",regionModel)

