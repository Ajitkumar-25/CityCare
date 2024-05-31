const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alertSchema = new Schema({
    pincode: { type: String },
    message: { type: String }
  });

alertSchema.set("timestamps", true);
  
  
  module.exports = mongoose.model("Alert", alertSchema);
  