const mongoose = require("mongoose");

const CourseCategorySchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    description: String,
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseCategory", CourseCategorySchema);
