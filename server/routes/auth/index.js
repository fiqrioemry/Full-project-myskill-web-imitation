const { userSignIn, userSignUp } = require("../../controller/auth/index");
const express = require("express");
const router = express.Router();

router.post("/sign-up", userSignUp);
router.post("/sign-in", userSignIn);

module.exports = router;
