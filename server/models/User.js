const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, enum: ["student", "admin"] },
    token: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
