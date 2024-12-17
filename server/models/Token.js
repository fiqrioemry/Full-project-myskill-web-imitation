const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema(
  {
    refreshToken: String,
    expiresAt: {
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Token", TokenSchema);
