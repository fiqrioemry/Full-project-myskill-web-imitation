const User = require("../../models/User");
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

    const profile = await Profile.create({
      fullname,
    });

    await User.create({
      email,
      password: hashPassword,
      role,
      profile: profile._id,
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

    const userData = await User.findOne({ email }).populate("profile").exec();

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
    const userName = userData.profile.fullname;
    const userEmail = userData.email;
    const userRole = userData.role;

    const accessToken = jwt.sign(
      { userId, userName, userEmail, userRole },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "15m",
      }
    );

    const refreshToken = jwt.sign(
      { userId, userName, userEmail, userRole },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: "30d",
      }
    );

    userData.token = refreshToken;
    await userData.save();

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 24 * 30 * 60 * 60 * 1000,
      })
      .send({
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

async function userRefreshToken(req, res) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).send({ message: "Session expired, please login" });
    }

    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);
    if (!user)
      return res.status(403).send({
        success: false,
        message: "Unauthorized Access !!!",
      });

    const payload = {
      userId: user.userId,
      userName: user.userName,
      userEmail: user.userEmail,
      userRole: user.userRole,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN, {
      expiresIn: "15m",
    });

    res.status(200).send({
      success: true,
      data: {
        accessToken: accessToken,
        user: payload,
      },
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = { userSignUp, userSignIn, userSignOut, userRefreshToken };
