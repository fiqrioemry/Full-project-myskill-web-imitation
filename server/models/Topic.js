const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    topicName: String,
    instructor: String,
    description: String,
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
