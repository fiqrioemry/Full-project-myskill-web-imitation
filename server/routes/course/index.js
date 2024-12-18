const express = require("express");
const { multerErrorHandle, upload } = require("../../middleware/media");
const { isAuthenticate, isAdmin } = require("../../middleware/validation");
const {
  getAllCategory,
  getAllCourseByCategory,
} = require("../../controller/course");

const router = express.Router();

router.get("/:categoryId", getAllCourseByCategory);
router.post(
  "/add",
  isAuthenticate,
  isAdmin,
  uploadMedia("video", 100000000).array("files", 5),
  multerErrorHandle,
  createNewCourse
);

router.get("/category", getAllCategory);
router.post(
  "/category/add",
  isAuthenticate,
  isAdmin,
  upload("image").array("files", 5),
  multerErrorHandle,
  createCourseCategory
);

module.exports = router;
