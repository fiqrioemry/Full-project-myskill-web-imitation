const {
  userSignIn,
  userSignUp,
  userSignOut,
} = require("../../controller/auth/index");
const express = require("express");
const router = express.Router();

router.post("/sign-up", userSignUp);
router.post("/sign-in", userSignIn);
router.get("/sign-out", userSignOut);

module.exports = router;
