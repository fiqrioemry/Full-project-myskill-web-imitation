const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourseCategory",
    },
    courseName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", CourseSchema);
