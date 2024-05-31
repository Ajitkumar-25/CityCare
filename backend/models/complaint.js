const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    citizenId: { type: Schema.Types.ObjectId, ref: "Citizen" },
    title: {type: String},
    status: { type: String },
    message: { type: String },
    type: { type: String },
    description: { type: String },
    locationInfo: {
        latitude: Number,
        longitude: Number,
        address: String,
        pincode: String
    },
    media: {type: String},
    upVotesCitizen: [{ type: Schema.Types.ObjectId, ref: "Citizen" }],
    upVotes: {
        type: Number,
        default: 0
    },
    isActive: { type: Boolean, default: true },
  });

  complaintSchema.set("timestamps", true);
  
  
  module.exports = mongoose.model("Complaint", complaintSchema);
  