const mongoose = require("mongoose");

const SubtopicSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    preview: Boolean,
    videoUrl: String,
    duration: String,
  },
  { timestamps: true }
);

const TopicSchema = new mongoose.Schema(
  {
    name: String,
    instructor: String,
    description: String,
    subtopics: [{ SubtopicSchema }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", TopicSchema);
