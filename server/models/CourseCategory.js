const mongoose = require("mongoose");

const CourseCategorySchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,
    course: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseCategory", CourseCategorySchema);
