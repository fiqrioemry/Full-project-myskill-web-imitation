const { uploadMediaToCloudinary } = require("../../utils/Cloudinary");
const Course = require("../../models/Course"); // Import schema
const Topic = require("../../models/Topic"); // Import schema
const Subtopic = require("../../models/Subtopic"); // Import schema
const mongoose = require("mongoose");

async function createTopicsAndSubtopics({
  courseName,
  categoryId,
  topicName,
  instructor,
  description,
  subtopicName,
  preview,
  files,
}) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Ensure `preview` is converted to boolean
    const previewBooleans = preview.map((value) => value === "true");

    const subtopicIds = [];

    // Iterate over `subtopicName` and `files`
    for (const [index, subtopic] of subtopicName.entries()) {
      const file = files[index];

      // Upload video to Cloudinary
      const uploadResult = await uploadMediaToCloudinary(file.path);
      const videoUrl = uploadResult.secure_url;
      const duration = uploadResult.duration;

      // Create Subtopic
      const newSubtopic = await Subtopic.create(
        [
          {
            subtopicName: subtopic,
            preview: previewBooleans[index], // Use converted boolean value
            videoUrl,
            duration,
          },
        ],
        { session }
      );
      subtopicIds.push(newSubtopic[0]._id);
    }

    // Create Topic
    const newTopic = await Topic.create(
      [
        {
          topicName,
          instructor,
          description,
          subtopics: subtopicIds,
        },
      ],
      { session }
    );

    // Create Course
    const newCourse = await Course.create(
      [
        {
          courseName,
          category: categoryId,
          topics: newTopic[0]._id,
        },
      ],
      { session }
    );

    // Commit Transaction
    await session.commitTransaction();
    session.endSession();

    return newCourse[0];
  } catch (error) {
    // Rollback Transaction
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

module.exports = createTopicsAndSubtopics;
