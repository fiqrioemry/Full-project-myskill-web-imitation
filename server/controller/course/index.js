const mongoose = require("mongoose");

const Topic = require("../../models/Topic");
const Course = require("../../models/Course");
const Subtopic = require("../../models/Subtopic");
const createSlug = require("../../utils/createSlug");
const CourseCategory = require("../../models/CourseCategory");
const { uploadMediaToCloudinary } = require("../../utils/Cloudinary");
const { courseRoute } = require("../../routes");

async function getAllCategory(req, res) {
  try {
    const categoryData = await CourseCategory.findAll();

    return res.status(200).send({ success: true, data: categoryData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get category",
      error: error.message,
    });
  }
}

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
    return res.status(500).send({
      success: false,
      message: "Internal Server Error ",
      error: error.message,
    });
  }
}

async function updateCourseCategory(req, res) {
  try {
    const { id } = req.params;
    const file = req.file;
    const { name, description } = req.body;

    const slug = name ? createSlug(name) : undefined;

    const courseCategory = await CourseCategory.findById(id);

    if (!courseCategory) {
      return res
        .status(404)
        .send({ success: false, message: "Course category not found" });
    }

    // Periksa apakah slug baru sudah ada (jika nama diubah)
    if (slug && slug !== courseCategory.slug) {
      const existCategory = await CourseCategory.findOne({ slug });

      if (existCategory) {
        return res.status(400).send({
          success: false,
          message: "Slug already exists for another category",
        });
      }
    }

    // Upload gambar ke Cloudinary jika file ada
    let imageUrl = courseCategory.image; // Tetap gunakan gambar lama jika tidak ada gambar baru
    if (file) {
      const result = await uploadMediaToCloudinary(file.path);
      imageUrl = result.secure_url;
    }

    // Update kategori dengan data baru
    courseCategory.name = name || courseCategory.name;
    courseCategory.slug = slug || courseCategory.slug;
    courseCategory.description = description || courseCategory.description;
    courseCategory.image = imageUrl;

    await courseCategory.save();

    return res.status(200).send({
      success: true,
      message: "Course category updated successfully",
      data: courseCategory,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
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
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
}

async function getAllCourseByCategory(req, res) {
  try {
    const { categoryId } = req.params; // Extract categoryId

    const courseData = await Course.find({ category: categoryId });

    if (!courseData || courseData.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No courses found for this category",
      });
    }

    return res.status(200).send({ success: true, data: courseData });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get course",
      error: error.message,
    });
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
          categoryId,
          topics: newTopic[0]._id,
        },
      ],
      { session }
    );

    // Commit Transaction
    await session.commitTransaction();
    session.endSession();
    return newCourse;
  } catch (error) {
    // Rollback Transaction
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

module.exports = {
  createNewCourse,
  getAllCourseByCategory,
  createCourseCategory,
  getAllCategory,
  updateCourseCategory,
};
