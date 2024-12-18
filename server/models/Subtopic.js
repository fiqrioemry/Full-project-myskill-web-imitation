const mongoose = require("mongoose");

const SubtopicSchema = new mongoose.Schema(
  {
    subtopicName: String,
    preview: Boolean,
    videoUrl: String,
    duration: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subtopic", SubtopicSchema);
