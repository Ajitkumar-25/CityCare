const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    all_pincode: [{ type: String }],
    all_locality: [{ type: String }],
    all_city: [{ type: String }],
    all_state: [{ type: String }],
    all_country: [{ type: String }],
    location: { type: String },
    category: { type: String },
    otp: { type: String },
    otpExpiration: {
        type: Date,
    },
    notification_token: { type: String },
    privacy: { type: String, default: "public" },
    visiblity: { type: String, default: "visible" },
    token: {
        type: String
    }
  });

  organizationSchema.set("timestamps", true);
  
  module.exports = mongoose.model("Organization", organizationSchema);
  