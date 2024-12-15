const express = require("express");
const isAuthenticate = require("../../middleware/isAuthenticate");
const { getUserProfile } = require("../../controller/user/getUserProfile");

const router = express.Router();

router.get("/profile", isAuthenticate, getUserProfile);
router.put("/profile/update", isAuthenticate, getUserProfile);

module.exports = router;
