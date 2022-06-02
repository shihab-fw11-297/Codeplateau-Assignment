
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
      },
      phone: {
        type: Number,
        required: true
      },
      password: {
        type: String,
        required: true
      }
    },
    { timestamps: true }
  );
  
  module.exports = mongoose.model("user", UserSchema)