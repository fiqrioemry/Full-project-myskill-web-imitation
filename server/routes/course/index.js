const express = require("express");
const { multerErrorHandle, upload } = require("../../middleware/media");
const { isAuthenticate, isAdmin } = require("../../middleware/validation");
const {
  getAllCategory,
  getAllCourseByCategory,
  createCourseCategory,
  createNewCourse,
  updateCourseCategory,
} = require("../../controller/course");

const router = express.Router();
// create category
router.post(
  "/category/add",
  isAuthenticate,
  isAdmin,
  upload("image").single("file"),
  multerErrorHandle,
  createCourseCategory
);

// update category
router.put(
  "/category/update/:id",
  isAuthenticate,
  isAdmin,
  upload("image").single("file"),
  multerErrorHandle,
  updateCourseCategory
);

// get category
router.get("/category", getAllCategory);

router.post(
  "/add",
  isAuthenticate,
  isAdmin,
  upload("video", 100000000).array("files", 5),
  multerErrorHandle,
  createNewCourse
);

// get course by id
router.get("/category/:categoryId", getAllCourseByCategory);

module.exports = router;
