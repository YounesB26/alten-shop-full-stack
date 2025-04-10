const userService = require("../services/users.service");
const userSchema = require("../models/user.schema");

const accountController = async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    //I disabled the password hashing for testing purposes
    //const hashedPassword = await bcrypt.hash(password, 10);

    await userService.addUser(req.body);

    return res.status(201).json({ message: "Account created successfully." });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = accountController;
