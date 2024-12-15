const User = require("../../models/User");
const Profile = require("../../models/Profile");

async function getUserProfile(req, res) {
  try {
    const { userId } = req.user;

    const userData = await Profile.findOne({ userId });

    if (!userData)
      return res
        .status(403)
        .send({ success: false, message: "Unauthorized Access !!!" });

    return res.status(200).send({ success: true, data: userData });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error ",
      error: error.message,
    });
  }
}

async function updateUserProfile(req, res) {
  try {
    const { userId } = req.user;
    const { fullname } = req.body;
  } catch (error) {}
}

module.exports = { getUserProfile, updateUserProfile };
