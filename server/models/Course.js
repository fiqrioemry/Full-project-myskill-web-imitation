const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseCategory",
    },
    courseName: String,
    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      },
    ], // Add this line to reference topics
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
