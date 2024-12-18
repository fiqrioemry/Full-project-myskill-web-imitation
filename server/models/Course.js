const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: String,
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
