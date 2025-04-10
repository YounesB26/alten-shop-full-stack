const logger = require("../utils/logger");
const userSchema = require("../models/user.schema");

module.exports = {
  addUser: async (user) => {
    //do like productService.addProduct using json server
    try {
      const { error } = userSchema.validate(user, {
        abortEarly: false,
      });
      if (error) {
        return res
          .status(400)
          .json({ errors: error.details.map((e) => e.message) });
      }

      const response = await fetch(`${process.env.API_URI}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error(`Error : ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error("userService.addUser : " + error);
      throw new Error("Internal server error");
    }
  },
  getUser: async (userEmail) => {
    try {
      if (!process.env.API_URI) {
        throw new Error("API_URI is not defined in environment variables.");
      }

      if (!userEmail) {
        throw new Error("User email is required");
      }

      const response = await fetch(
        `${process.env.API_URI}/users?email=${userEmail}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`Error fetching user : ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error("userService.getUser : " + error);
      throw new Error("Internal server error");
    }
  },
  updateUser: async (user) => {
    try {
      if (!process.env.API_URI) {
        throw new Error("API_URI is not defined in environment variables.");
      }

      if (!user) {
        throw new Error("User is required");
      }

      const response = await fetch(
        `${process.env.API_URI}/users/${user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "PATCH",
          body: JSON.stringify(user),
        }
      );

      if (!response.ok) {
        throw new Error(`Error updating user : ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error("userService.updateUser : " + error);
      throw new Error("Internal server error");
    }
  },
};
