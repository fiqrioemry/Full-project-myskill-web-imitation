const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Nama paket langganan, misal "Basic", "Premium", dll.
      enum: ["1 month", "3 months", "6 months", "1 year"], // Pilihan durasi langganan
    },
    price: {
      type: Number,
      required: true,
    },
    autoRenew: Boolean,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscription", SubscriptionSchema);
