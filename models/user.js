const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true, 
  },
  mobileno: {
    type: Number, 
    required: true,
    unique:true
  },
  mpin: {
    type: String,
    required: true,
    maxlength:6,
    minlength:6
  },
  state: {
    type: String,
    required: true, 
  },
  password: {
    type: String,
    required: true,
    minlength: 6, 
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"], // Example: Restrict role to certain values
  },
});

module.exports = mongoose.model("User", UserSchema);
