const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    orgName:{
        type : String,
        required: true,
        unique: true,
        trim : true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },

    password:{
        type: String,
        required: true
    }
},{timestamps:{
    createdAt: 'documentCreatedAt',
    updatedAt: 'documentUpdatedAt'
}})


module.exports = mongoose.model("Organization",organizationSchema);