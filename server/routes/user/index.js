const express = require("express");
const { isAuthenticate } = require("../../middleware/validation");
const { getUserProfile, updateUserProfile } = require("../../controller/user");
const router = express.Router();

router.get("/profile", isAuthenticate, getUserProfile);
router.put("/profile/update", isAuthenticate, updateUserProfile);

module.exports = router;
