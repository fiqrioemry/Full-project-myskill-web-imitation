const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
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
