const jwt = require("jsonwebtoken");

module.exports = async function isAuthenticate(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, decode) => {
    if (err)
      return res.status(403).json({ message: "Token invalid or expired" });

    req.user = decode;
    next();
  });
};
