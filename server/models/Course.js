const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  topics: [TopicSchema],
  image: { type: String },
});

module.exports = mongoose.model("Course", CourseSchema);
