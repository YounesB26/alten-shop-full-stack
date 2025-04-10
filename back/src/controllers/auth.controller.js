const userService = require("../services/users.service");
const token = require("../utils/token");

const authController = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request required" });
    }
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await userService.getUser(email);

    if (!user && user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user || user.length === 0 || user[0].password !== password) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const accessToken = token.generateAccessToken(user[0]);

    //Save access token
    await userService.updateUser({ ...user[0], accessToken });

    return res.status(200).json({ message: "Login successful", accessToken });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = authController;
