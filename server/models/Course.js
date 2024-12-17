const mongoose = require("mongoose");

const SubtopicSchema = new mongoose.Schema({
  topicId: {
    type: mongoose.Types.Schema.ObjectId,
    ref: "Topic",
    required: true,
  },
  name: String,
  description: String,
  videoUrl: String,
  duration: String,
});

const TopicSchema = new mongoose.Schema({
  courseId: {
    type: mongoose.Types.Schema.ObjectId,
    ref: "Course",
    required: true,
  },
  name: { type: String, required: true },
  instructor: String,
  description: String,
  subtopics: [SubtopicSchema],
});

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  topics: [TopicSchema],
  image: { type: String },
});

module.exports = mongoose.model("Course", CourseSchema);
