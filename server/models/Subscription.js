const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
  {
    planType: {
      type: String,
      enum: ["1month", "3month", "6month", "12month"],
    },
    startDate: { type: Date, default: Date.now },
    endDate: Date,
    paymentMethod: String,
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    autoRenew: {
      type: Boolean,
      default: false,
    },
  },
  { timestampt: true }
);

module.exports = mongoose.model("Subscription", SubscriptionSchema);
