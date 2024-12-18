const express = require("express");
const isAuthenticate = require("../../middleware/isAuthenticate");
const isAdmin = require("../../middleware/isAdmin");
const {
  uploadMedia,
  multerErrorHandle,
} = require("../../middleware/uploadMedia");
const {
  createCourseCategory,
} = require("../../controller/course/createCourseCategory");
const {
  uploadVideo,
  createNewCourse,
} = require("../../controller/course/createNewCourse");

const router = express.Router();

router.post(
  "/category/add",
  isAuthenticate,
  isAdmin,
  uploadMedia("image").single("file"),
  multerErrorHandle,
  createCourseCategory
);

router.post("/add", createNewCourse);

module.exports = router;
