const User = require("../../models/User");
const Token = require("../../models/Token");
const Profile = require("../../models/Profile");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

// user signup
async function userSignUp(req, res) {
  const { fullname, email, password, passwordConfirm, role } = req.body;

  try {
    if (password !== passwordConfirm)
      return res
        .status(400)
        .send({ success: false, message: "password did not match" });

    const isExist = await User.findOne({ email });

    if (isExist)
      return res
        .status(400)
        .send({ success: false, message: "Email already in use" });

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashPassword,
      role,
    });

    await Profile.create({
      userId: newUser._id,
      fullname,
    });

    return res
      .status(201)
      .send({ success: true, message: "Registration is success" });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function userSignIn(req, res) {
  try {
    const { email, password } = req.body;

    const userData = await User.findOne({ email });
    const userProfile = await Profile.findOne({ userId: userData._id });

    if (!userData)
      return res
        .status(404)
        .send({ success: false, message: "Email is not registered" });

    const validPassword = await bcrypt.compare(password, userData.password);

    if (!validPassword)
      return res
        .status(400)
        .send({ success: false, message: "Password is wrong" });

    const userId = userData._id;
    const userName = userProfile.fullname;
    const userEmail = userData.email;
    const userRole = userData.role;

    const accessToken = jwt.sign(
      { userId, userName, userEmail, userRole },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "1h",
      }
    );

    const refreshToken = jwt.sign(
      { userId, userName, userEmail, userRole },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "30d",
      }
    );

    const tokenData = await Token.findOne({ userId });

    if (!tokenData) {
      await Token.create({
        userId,
        refreshToken,
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      });
    } else {
      tokenData.refreshToken = refreshToken;
      tokenData.expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      await tokenData.save();
    }

    // set token as req cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 30 * 60 * 60 * 1000,
    });

    return res.status(200).send({
      success: true,
      message: "Login is success",
      data: {
        accessToken,
        user: { userId, userName, userEmail, userRole },
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

async function userSignOut(req, res) {
  try {
    delete req.headers.authorization;

    res.clearCookie("refreshToken");

    return res.status(200).send({
      success: true,
      message: "Logout is Success",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error",
    });
  }
}

module.exports = { userSignUp, userSignIn, userSignOut };
