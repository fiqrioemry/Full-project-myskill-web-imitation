const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    fullname: String,
    phone: String,
    location: String,
    profession: String,
    opportunity: String,
    linkCV: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
