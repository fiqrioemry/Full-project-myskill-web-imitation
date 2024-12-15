const {
  userSignIn,
  userSignUp,
  userSignOut,
  userRefreshToken,
} = require("../../controller/auth/index");
const express = require("express");
const router = express.Router();

router.post("/sign-up", userSignUp);
router.post("/sign-in", userSignIn);
router.get("/sign-out", userSignOut);
router.post("/refresh", userRefreshToken);

module.exports = router;
