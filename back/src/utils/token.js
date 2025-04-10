const jwt = require("jsonwebtoken");
const token = {
  generateAccessToken: function (user) {
    return jwt.sign(
      { email: user.email, id: user.id },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "1h",
      }
    );
  },
};

module.exports = token;
