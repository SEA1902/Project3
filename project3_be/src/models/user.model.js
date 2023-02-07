const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  phone: String,
  address: String,
  subAddress: [String],
});

module.exports = mongoose.model("User", UserSchema);
