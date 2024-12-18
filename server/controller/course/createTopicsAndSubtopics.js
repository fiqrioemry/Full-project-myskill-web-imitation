const { uploadMediaToCloudinary } = require("../../utils/Cloudinary");
const Course = require("../../models/Course"); // Import schema
const Topic = require("../../models/Topic"); // Import schema
const Subtopic = require("../../models/Subtopic"); // Import schema
const mongoose = require("mongoose");

async function createTopicsAndSubtopics({ courseName, categoryId, topicData }) {
  // Mulai session untuk transaksi
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const subtopicIds = [];

    // Step 1.1: Iterasi melalui data subtopics untuk setiap topic
    for (const subtopic of topicData.subtopics) {
      const uploadResult = await uploadMediaToCloudinary(
        subtopic.videoFile.path
      );
      videoUrl = uploadResult.secure_url;
      duration = uploadResult.duration;

      const createdSubtopic = await Subtopic.create(
        {
          subtopicName: subtopic.subtopicName,
          preview: subtopic.preview || false,
          videoUrl,
          duration: subtopic.duration,
        },
        { session }
      );
      subtopicIds.push(createdSubtopic._id);
    }

    // Step 2: Buat topic dengan subtopics terkait
    const createdTopic = await Topic.create(
      {
        topicName: topicData.topicName,
        instructor: topicData.instructor,
        description: topicData.description,
        subtopics: subtopicIds,
      },

      { session }
    );

    const createdCourse = await Course.create(
      {
        courseName,
        category: categoryId,
        topics: topicIds,
      },
      { session }
    );

    // Commit transaksi jika semua berhasil
    await session.commitTransaction();
    session.endSession();

    return createdCourse[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

module.exports = createTopicsAndSubtopics;
