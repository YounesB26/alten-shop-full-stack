const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const userService = require("../services/users.service");

const authentication = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: "Login required. Please sign in to continue." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (!decoded) {
      return res.status(403).json({ error: "Invalid token." });
    }

    const user = await userService.getUser(decoded.email);
    if (!user || user.length === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    req.user = user[0];

    next();
  } catch (error) {
    logger.error(error);

    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ error: "Token has expired. Please log in again." });
    }

    res.status(403).json({ error: "Invalid token." });
  }
};

const isAdmin = (req, res, next) => {

  if (req.user.email !== "admin@admin.com") {
    return res.status(403).json({ error: "Access denied. Admin only." });
  }
  next();
};

module.exports = { authentication, isAdmin };
