const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const citizenSchema = new Schema({
    fname: {
      type: String,
      required: true,
    },
    notification_token: { type: String },
    lname: { type: String },
    status: { type: String },
    username: { type: String },
    profile_pic: { type: String, default: "" },
    background_pic: { type: String, default: "" },
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
    dob: { type: Date },
    pincode: { type: String },
    locality: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    location: { type: String },
    otp: { type: String },
    otpExpiration: {
      type: Date,
    },
    bio: { type: String },
    privacy: { type: String, default: "public" },
    visiblity: { type: String, default: "visible" },
    followers: [{ type: String }],
    following: [{ type: String }],
    isActive: { type: Boolean, default: true },
    blockedUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    blockedByUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    isPremium :{ type: Boolean, default: false },
    token: {
        type: String
    }
  });

  citizenSchema.set("timestamps", true);
  
  
  module.exports = mongoose.model("Citizen", citizenSchema);
  