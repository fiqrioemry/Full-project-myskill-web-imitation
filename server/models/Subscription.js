const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
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
});

module.exports = mongoose.model("Subscription", UserSchema);
