const createTopicsAndSubtopics = require("./createTopicsAndSubtopics");
const { uploadMediaToCloudinary } = require("../../utils/Cloudinary");

async function createNewCourse(req, res) {
  const { courseName, categoryId, topicsData } = req.body;

  try {
    const newCourse = await createTopicsAndSubtopics({
      courseName,
      categoryId,
      topicsData,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
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
