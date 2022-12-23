const organizationModel=require("../../models/organizationModels/organizationModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {isValid} = require("../../utils/validation");
const validator = require('validator')


const registerOrganization=async function (req,res){
    
    try {
        const {orgName,email,password}=req.body

        if (!isValid(orgName)) {
            return res
              .status(400)
              .send({ status: false, message: "Organization name is required" });
          }

          if (!validator.isAlpha(orgName.trim()))
      return res
        .status(400)
        .send({ status: false, msg: "name must be between a-z or A-Z" });


        if (!isValid(email)) return res.status(400).send({ status: false, message: "please enter email" })
        if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) return res.status(400).send({ status: false, message: "please enter valid email" })
        const usedEmail = await organizationModel.findOne({ email: email })
        if (usedEmail) return res.status(409).send({ status: false, message: "emailId is already used" })
        
        if (!isValid(password)) return res.status(400).send({ status: false, message: "please enter password" })

        const newPassword=bcrypt.hashSync(data.password,10)
        password=newPassword
    

    
        const createData=await organizationModel.create(data)
        return res.status(201).send({ status: true, message: "registered successfully",data: createData });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
   
    
}
const loginOrganization=async function (req,res){
    try {
        const data=req.body
        let findUser = await organizationModel.findOne({ email: data.email});
        if (!findUser) {return res.status(404).send({ status: false, message: "user not found" })}
       let compare= bcrypt.compareSync(data.password,findUser.password)
       if(!compare){return res.status(401).send({ status: false, message: "incorrect password" });}
       let token = jwt.sign(
        {
          id: String(findUser._id),
          initializeAt: new Date(),
        },
        "tvXreBDsnQoZl91Z",
        { expiresIn: "1d" }
      );
  
      res.setHeader("jwt", token);
      return res
      .status(200)
      .send({
        status: true,
        message: "login successful",
        token,
        id: findUser._id,
      });
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });

    }
} 

module.exports={registerOrganization,loginOrganization}