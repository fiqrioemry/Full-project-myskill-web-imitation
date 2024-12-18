const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, enum: ["student", "admin"] },
    token: String,
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
    },

    history: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "History",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
