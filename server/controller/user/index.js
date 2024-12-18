const User = require("../../models/User");
const Profile = require("../../models/Profile");

async function getUserProfile(req, res) {
  try {
    const { userId } = req.user;
    console.log(userId);
    const userData = await Profile.findOne({ userId });
    console.log(userData);
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
    const { fullname, phone, location, profession, opportunity, linkCV } =
      req.body;

    const oldUserData = await Profile.findOne({ userId });

    if (!oldUserData) {
      return res
        .status(403)
        .send({ success: false, message: "Unauthorized Access !!" });
    }

    const isDataUnchanged =
      oldUserData.fullname === fullname &&
      oldUserData.phone === phone &&
      oldUserData.location === location &&
      oldUserData.profession === profession &&
      oldUserData.opportunity === opportunity &&
      oldUserData.linkCV === linkCV;

    if (isDataUnchanged) {
      return res.status(400).send({
        success: false,
        message: "No changes detected. Please modify the data before updating.",
      });
    }

    oldUserData.fullname = fullname;
    oldUserData.phone = phone;
    oldUserData.location = location;
    oldUserData.profession = profession;
    oldUserData.opportunity = opportunity;
    oldUserData.linkCV = linkCV;

    await oldUserData.save();

    return res.status(200).send({
      success: true,
      message: "Profile is updated.",
      data: oldUserData,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

module.exports = { getUserProfile, updateUserProfile };
