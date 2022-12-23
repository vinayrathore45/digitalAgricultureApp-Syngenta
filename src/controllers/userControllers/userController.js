const userModel = require("../../models/userModels/userModel");
const cropCycle=require("../../models/organizationModels/cropsModels/cropFieldModel")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {isValid} = require("../../utils/validation");
const validator = require("validator");



const registerUser = async (req, res) => {
  console.log(req.body.name);
  const { name, email, password } = req.body;
  try {
    if (!isValid(name)) {
      return res
        .status(400)
        .send({ status: false, message: "name is required" });
    }
    if (!validator.isAlpha(name.trim()))
      return res
        .status(400)
        .send({ status: false, msg: "name must be between a-z or A-Z" });

    if (!isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "email is required" });
    }
    if (!/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email)) return res.status(400).send({ status: false, message: "please enter valid email" })
    if (!isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "password is required" });
    }
    if (password.length < 8 || password.length > 16) {
      return res
        .status(400)
        .send({
          status: false,
          message: "password must be 8 to 16 character long",
        });
    }

    let findEmail = await userModel.findOne({ email: email, isDeleted: false });
    if (findEmail) {
      return res
        .status(400)
        .send({ status: false, message: "this email is already in use" });
    }

    const hash = bcrypt.hashSync(password, 10);
    password = hash;

    let newData = await userModel.create({ name, email, password });
    return res
      .status(201)
      .send({ status: true, message: "registered successfully",data: newData });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, message: error.message });
  }
};


const loginUser = async function (req, res) {
  try {
    let { email, password } = req.body;

    if (!isValid(email)) {
      return res
        .status(400)
        .send({ status: false, message: "email is required" });
    }
    if (!isValid(password)) {
      return res
        .status(400)
        .send({ status: false, message: "password is required" });
    }

    let findUser = await userModel.findOne({ email: email, isDeleted: false });
    if (!findUser) {
      return res.status(404).send({ status: false, message: "user not found" });
    }

    let compare = bcrypt.compareSync(password, findUser.password);
    if (!compare) {
      return res
        .status(401)
        .send({ status: false, message: "incorrect password" });
    }

    let token = jwt.sign(
      {
        id: String(findUser._id),
        initializeAt: new Date(),
      },
      "YSCSTxJPqDHSdtmS",
      { expiresIn: "1d" }
    );

    res.setHeader("jwt", token);
    console.log(token);
   return res
      .status(200)
      .send({
        status: true,
        message: "login successful",
        token,
        id: findUser._id,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, message: error.message });
  }
};


const fetchCropCycle = async function (req, res) {
  try {
    const userId = req.params.userId

    const registered = userModel.findById(userId)
    if(!registered){
      return res.status(404).send({status:false,message: 'user not found'})
    }

   const fetchAllCropCycle = await cropCycle.find().populate({path:"fieldId"}[{ path: "cropId" }]);
   return res
   .status(200)
   .send({ status: true, data: fetchAllCropCycle });

  } catch (error) {
    console.log(error);
    return res.status(500).send({ status: false, message: error.message });
  }
};
module.exports = { registerUser, loginUser,fetchAllCropCycle };