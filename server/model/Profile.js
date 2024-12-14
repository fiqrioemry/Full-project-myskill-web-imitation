const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullname: String,
  phone: String,
  location: String,
  profession: String,
  opportunity: String,
  linkCV: String,
});

module.exports = mongoose.model("Profile", ProfileSchema);
