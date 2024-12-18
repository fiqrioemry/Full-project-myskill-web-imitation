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
const { createNewCourse } = require("../../controller/course/createNewCourse");

const router = express.Router();

router.post(
  "/category/add",
  isAuthenticate,
  isAdmin,
  uploadMedia("image").array("files", 5),
  multerErrorHandle,
  createCourseCategory
);

router.post(
  "/add",
  uploadMedia("video", 100000000).any(),
  multerErrorHandle,
  createNewCourse
);

module.exports = router;

// {
//     courseName : 'Front end development',
//     category : "Web development",
//     topics : [
//         {
//             topicName : 'HTML Basic',
//             instructor : "John doe",
//             description : "intro HTML basic topic",
//             subtopic : [
//             {
//                 subtopicName : "intro HTML"
//                 videoFile : file uploaded through postman
//             },
//             {
//                 subtopicName : "semantic HTML"
//                 videoFile : file uploaded through postman
//             }]

//         },
//     ]
//  }
