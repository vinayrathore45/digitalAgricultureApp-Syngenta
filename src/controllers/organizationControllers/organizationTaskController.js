const cropModel=require("../../models/organizationModels/cropsModels/cropModel")
const regionModel=require("../../models/organizationModels/propertyModels/regionModel")
const propertyModel=require("../../models/organizationModels/propertyModels/propertyModel")
const fieldModel=require("../../models/organizationModels/propertyModels/fieldModel")
const cropCycle=require("../../models/organizationModels/cropsModels/cropFieldModel")



const createCrop=async function (req,res){
    try {
        let data=req.body
        let createData=await cropModel.create(data)
        return res.status(201).send({status:true,message:"created successfully",data:createData})

    } catch (error) {
      return res.status(500).send({ status: false, msg: error.message })
    }
}
const updateCrop=async function (req,res){
    try {
      
        let data=req.body
        let cropid=req.params.cropid
        let findCrop=await cropModel.findOne({_id:cropid}).lean()
        if(!findCrop)return res.status(404).send({status:false,message:"crop not found "})

        if(data.cropName){
            findCrop.cropName=data.cropName}
        if(data.avgWaterRequired){findCrop.avgWaterRequired=data.avgWaterRequired}
        if(data.avgTemperatureRequired){findCrop.avgTemperatureRequired=data.avgTemperatureRequired}
        if(data.climate){findCrop.climate=data.climate}
        if(data.typeofCrop){findCrop.typeofCrop=data.typeofCrop}

        const updateData=await cropModel.findOneAndUpdate({_id:cropid},{$set:findCrop},{new:true})
        return res.status(200).send({status:true,message:"updated successfully",data:updateData})

    } catch (error) {
      console.log(error);
      return res.status(500).send({ status: false, msg: error.message })
    }
}
const deleteCrop=async function(req,res){
try {
    let cropid=req.params.cropid
    let findCrop=await cropModel.findOne({_id:cropid}).lean()
    if(!findCrop)return res.status(404).send({status:false,message:"crop not found "})
    findCrop.isDeleted=true
    await cropModel.findOneAndUpdate({_id:cropid},{$set:findCrop},{new:true})
    return res.status(204).send({status:true,message:"deleted successfully"})


} catch (error) {
  console.log(error);
  return res.status(500).send({ status: false, msg: error.message })
}
}

const createField=async function(req,res){
try {
    let data=req.body
    // if(!data.fieldID)
    console.log(data);
    // if(data.fieldID.length===0 || data.fieldID){return res.status(400).send({status:false,message:"fieldID is required"})}
   let createData=await fieldModel.create(data)
   return res.status(201).send({status:true,message:"created successfully",data:createData})

} catch (error) {
  console.log(error);
  return res.status(500).send({ status: false, msg: error.message })
}
} 
 



const createRegion=async function (req,res){
  try {
      const data=req.body
      const createData=await regionModel.create(data)
      return res.status(201).send({status:true,message:"created successfully",data:createData})
  } catch (error) {
    console.log(error);
      return res.status(500).send({ status: false, msg: error.message })
  }
}
const createProperty=async function (req,res){
  try {
      const data=req.body
    
      const findRegion=await regionModel.findById(data.regionID)
     
      if(!findRegion)return res.status(404).send({status:false,message:"region not found "})

      const createData=await propertyModel.create(data)
      return res.status(201).send({status:true,message:"created successfully",data:createData})
  } catch (error) {
    console.log(error);
      return res.status(500).send({ status: false, msg: error.message })
  }
}

const createCropCycleField=async (req,res)=>{
  try {
      let data=req.body
      const createData=await cropCycle.create(data)
      return res.status(201).send({status:true,message:"created successfully",data:createData})
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, msg: error.message })
  }

}



module.exports={createCrop,createRegion,createProperty,updateCrop,deleteCrop,createField,createCropCycleField}
