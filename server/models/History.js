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
      ref: "Course",
      required: true,
    },
    topicId: {
      type: mongoose.Schema.Types.ObjectId, // 1,2,3,4
      ref: "Topic",
      required: true,
    },
    progress: [
      {
        subtopicId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SubTopic",
          required: true,
        },
        status: {
          type: String,
          enum: ["completed", "in-progress"],
          default: "in-progress",
        },
      },
    ],
    status: {
      type: String,
      enum: ["completed", "in-progress"],
      default: "in-progress",
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", HistorySchema);
