const mongoose = require("mongoose")

const uploadSchema = new mongoose.Schema({
    name:String,
    image:String
},
 { timestamps: true }

)

module.exports = mongoose.model("Upload", uploadSchema);