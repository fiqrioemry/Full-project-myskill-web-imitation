const jwt = require("jsonwebtoken");

module.exports = async function isAuthenticate(req, res, next) {
  try {
    const authHeader = req.headers.Authorization;

    const token = authHeader.split(" ").pop();

    if (!token)
      return res
        .status(401)
        .send({ success: false, message: "Sessions Expired, please login" });

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN);

    if (!decode)
      return res
        .status(403)
        .send({ success: false, message: "Unauthorized Access !!!" });

    req.user = decode;

    next();
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Internal Server Error ",
      error: error.message,
    });
  }
};
