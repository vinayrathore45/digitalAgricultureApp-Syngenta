const express = require("express");
const router = express.routerr();
const { registerUser, loginUser ,fetchAllCropCycle} = require("../controllers/userControllers/userController");
const {
  registerOrganization,
  loginOrganization,
} = require("../controllers/organizationControllers/organizationRegisterController");
const {
  createCrop,
  createRegion,
  createProperty,
  updateCrop,
  deleteCrop,
  createField,
  createCropCycleField,
} = require("../controllers/organizationControllers/organizationTaskController");
const { organizationAuth } = require("../middleWares/organizationAuth");
const {authenticate} = require('../middleWares/userAuth')

//Organization APIs

router.post("/organization/register", registerOrganization);
router.post("/organization/login", loginOrganization);

//Crop
router.post("/organization/crop", organizationAuth, createCrop);
router.put("/organization/crop/:cropid", organizationAuth, updateCrop);
router.delete(
  "/organization/crop/:cropid",
  organizationAuth,
  deleteCrop
);

//CropCycle
router.post(
  "/organization/createCropCycle",
createCropCycleField
);

//Field
router.post("/organization/field", createField);

//Region
router.post(
  "/organization/create/region",
  organizationAuth,
createRegion
);

//Property
router.post(
  "/organization/create/property",
  organizationAuth,
createProperty
);

// User APIs
router.post("/register/user", registerUser);

router.post("/login/user", loginUser);
router.get('/cropCycle/:id',fetchAllCropCycle)

module.exports = router;
