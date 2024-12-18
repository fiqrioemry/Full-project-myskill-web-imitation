const mongoose = require("mongoose");

const SubtopicSchema = new mongoose.Schema(
  {
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic",
    },
    subtopicName: String,
    preview: Boolean,
    videoUrl: String,
    duration: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subtopic", SubtopicSchema);
