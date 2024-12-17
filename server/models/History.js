const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MainCourse",
      required: true,
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Topic", // Menghubungkan dengan Topic
      required: true,
    },
    subtopicProgress: [
      {
        subtopicId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SubTopic", // Menghubungkan dengan SubTopic
          required: true,
        },
        status: {
          type: String,
          enum: ["completed", "in-progress"],
          default: "in-progress", // Status subtopic
        },
        watchedAt: { type: Date }, // Waktu terakhir ditonton
      },
    ],
    progress: {
      type: Number, // Persentase progress (0-100%)
      default: 0,
    },
    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress", // Status keseluruhan
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
); // Mengaktifkan createdAt & updatedAt otomatis

module.exports = mongoose.model("History", HistorySchema);
