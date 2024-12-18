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

router.post(
  "/add",
  isAuthenticate,
  isAdmin,
  upload("video", 100000000).array("files", 5),
  multerErrorHandle,
  createNewCourse
);

router.get("/category", getAllCategory);
router.get("/category/:categoryId", getAllCourseByCategory);
router.post(
  "/category/add",
  isAuthenticate,
  isAdmin,
  upload("image").single("file"),
  multerErrorHandle,
  createCourseCategory
);

router.put(
  "/category/update/:id",
  isAuthenticate,
  isAdmin,
  upload("image").single("file"),
  multerErrorHandle,
  updateCourseCategory
);

module.exports = router;
