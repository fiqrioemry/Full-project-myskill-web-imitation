const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema(
  {
    topicName: String,
    instructor: String,
    Description: String,
    subtopics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subtopic",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", TopicSchema);
