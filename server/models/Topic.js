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
  },
  { timestamps: true }
);

module.exports = mongoose.model("Topic", TopicSchema);
