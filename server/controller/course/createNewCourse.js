const createTopicsAndSubtopics = require("./createTopicsAndSubtopics");
const { uploadMediaToCloudinary } = require("../../utils/Cloudinary");
const Course = require("../../models/Course");
async function createNewCourse(req, res) {
  const {
    courseName,
    categoryId,
    topicName,
    instructor,
    description,
    subtopicName,
    preview,
  } = req.body;

  const files = req.files;

  try {
    const newCourseData = await createTopicsAndSubtopics({
      courseName,
      categoryId,
      topicName,
      instructor,
      description,
      subtopicName,
      preview,
      files,
    });

    const data = await Course.findOne({ _id: newCourseData._id }).populate(
      "topics"
    );

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
}

async function uploadVideo(req, res) {
  const file = req.file;

  const upload = await uploadMediaToCloudinary(file.path);

  return res.status(200).send({ success: true, data: upload });
}

module.exports = { createNewCourse, uploadVideo };
