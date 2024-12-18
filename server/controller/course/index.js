const mongoose = require("mongoose");

const Topic = require("../../models/Topic");
const Course = require("../../models/Course");
const Subtopic = require("../../models/Subtopic");
const createSlug = require("../../utils/createSlug");
const CourseCategory = require("../../models/CourseCategory");
const { uploadMediaToCloudinary } = require("../../utils/Cloudinary");
const { courseRoute } = require("../../routes");

async function createCourseCategory(req, res) {
  try {
    const file = req.file;

    const { name, description } = req.body;
    const slug = createSlug(name);

    const existCategory = await CourseCategory.findOne({ slug });

    if (existCategory)
      return res
        .status(400)
        .send({ success: false, message: "Course category already exist" });

    const result = await uploadMediaToCloudinary(file.path);

    const courseCategoryData = await CourseCategory.create({
      name,
      slug,
      description,
      image: result.secure_url,
    });

    return res.status(201).send({
      success: true,
      message: "New Course Category is created",
      data: courseCategoryData,
    });
  } catch (error) {
    handleError(res, error, "Failed to create course category");
  }
}

async function updateCourseCategory(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const file = req.file;

    const courseCategory = await CourseCategory.findById(id);
    if (!courseCategory) {
      return res.status(404).send({
        success: false,
        message: "Course category not found",
      });
    }

    const slug = name ? createSlug(name) : courseCategory.slug;
    if (slug !== courseCategory.slug) {
      const existCategory = await CourseCategory.findOne({ slug });
      if (existCategory) {
        return res.status(400).send({
          success: false,
          message: "Slug already exists for another category",
        });
      }
    }

    const imageUrl = file
      ? (await uploadMediaToCloudinary(file.path)).secure_url
      : courseCategory.image;

    Object.assign(courseCategory, {
      name: name || courseCategory.name,
      slug,
      description: description || courseCategory.description,
      image: imageUrl,
    });

    await courseCategory.save();

    res.status(200).send({
      success: true,
      message: "Course category updated successfully",
      data: courseCategory,
    });
  } catch (error) {
    handleError(res, error, "Failed to update course category");
  }
}

async function getAllCategory(req, res) {
  try {
    const categoryData = await CourseCategory.find().lean();

    return res.status(200).send({ success: true, data: categoryData });
  } catch (error) {
    handleError(res, error, "Failed to get categories");
  }
}

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
    await createTopicsAndSubtopics({
      courseName,
      categoryId,
      topicName,
      instructor,
      description,
      subtopicName,
      preview,
      files,
    });

    res.status(201).json({
      success: true,
      message: "New Course is created",
    });
  } catch (error) {
    handleError(res, error, "Failed to create course");
  }
}

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
    const previewBooleans = preview.map((value) => value === "true");

    // Create Course
    const newCourse = await Course.create(
      {
        courseName,
        categoryId,
      },
      { session }
    );

    // Create Topic
    const newTopic = await Topic.create(
      {
        courseId: newCourse._id,
        topicName,
        instructor,
        description,
      },
      { session }
    );

    // Iterate over `subtopicName` and `files`
    for (let i = 0; i < subtopicName.length; i++) {
      const uploadResult = await uploadMediaToCloudinary(files[i].path);

      await Subtopic.create(
        {
          topicId: newTopic._id,
          subtopicName: subtopicName[i],
          preview: previewBooleans[i],
          videoUrl: uploadResult.secure_url,
          duration: uploadResult.duration,
        },
        { session }
      );
    }

    // Commit Transaction
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    // Rollback Transaction
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

async function getAllCourseByCategory(req, res) {
  try {
    const { categoryId } = req.params; // Extract categoryId

    const courseData = await Topic.find({ courseId: categoryId });
    if (!courseData || courseData.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No courses found for this category",
      });
    }
    return res.status(200).send({ success: true, data: courseData });
  } catch (error) {
    handleError(res, error, "Failed to get courses by category");
  }
}

function handleError(res, error, message) {
  res.status(500).send({
    success: false,
    message,
    error: error.message,
  });
}

module.exports = {
  createNewCourse,
  getAllCourseByCategory,
  createCourseCategory,
  getAllCategory,
  updateCourseCategory,
};
