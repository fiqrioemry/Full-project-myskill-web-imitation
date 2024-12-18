const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    courseName: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseCategory",
    },
    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
