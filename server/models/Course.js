const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    image: String,
    topics: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Topic",
      },
    ],
  },
  { timestamps: true }
); // Tambahkan createdAt dan updatedAt otomatis

module.exports = mongoose.model("Course", CourseSchema);
