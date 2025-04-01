const mongoose = require("mongoose")

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => Date.now() + 10 * 60 * 1000 // Expires in 10 minutes
  },
});

const OTP =  mongoose.model("OTP", otpSchema);
module.exports = OTP