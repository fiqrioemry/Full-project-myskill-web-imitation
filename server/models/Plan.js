const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
  name: String,
  price: Number,
  type: { type: String, enum: ["e-learning", "bootcamp"] },
  duration: Number,
});

module.exports = mongoose.model("Plan", PlanSchema);
