const { uploadMediaToCloudinary } = require("../../utils/Cloudinary");
const CourseCategory = require("../../models/CourseCategory");
const createSlug = require("../../utils/createSlug");

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

module.exports = { createCourseCategory };

// await CourseCategory.create({
//   name,
//   description,
//   image: imageURL,
// });
