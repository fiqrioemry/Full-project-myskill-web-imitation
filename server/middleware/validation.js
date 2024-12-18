const jwt = require("jsonwebtoken");

async function isAuthenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
    if (err)
      return res.status(403).json({ message: "Token invalid or expired" });

    req.user = decode;
    next();
  });
}

async function isAdmin(req, res, next) {
  try {
    if (req.user.userRole !== "admin")
      return res.status(403).send({ message: "Access is Prohibited" });
    next();
  } catch (error) {
    console.log(error.message);
  }
}
module.exports = { isAuthenticate, isAdmin };
