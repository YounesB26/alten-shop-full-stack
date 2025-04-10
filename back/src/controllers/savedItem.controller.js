const userService = require("../services/users.service");
const logger = require("../utils/logger");

const getSavedItemsController = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(400)
        .json({ error: "Login Required to retrieve items" });
    }

    const user = await userService.getUser(req.user.email);

    if (!user || user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const savedItems = user[0].savedItems || [];

    return res.status(200).json(savedItems);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const saveItemController = async (req, res) => {

  try {
    if (!req.user) {
      return res.status(400).json({ error: "Login Required to save item" });
    }

    if (!req.body || !req.body.productId) {
      return res.status(400).json({ error: "Request body is required" });
    }

    const user = await userService.getUser(req.user.email);

    if (!user || user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    user[0].savedItems = user[0].savedItems || [];

    const itemExists = user[0].savedItems.includes(req.body.productId);
    if (itemExists) {
      return res.status(200).json({ error: "Item already in your wish list" });
    }

    if (!itemExists) {
      user[0].savedItems.push(req.body.productId);
      await userService.updateUser(user[0]);
    }

    return res
      .status(200)
      .json({ message: "Item saved successfully", item: user[0].savedItems });
  } catch (error) {
    logger.error("saveItemController : " + error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getSavedItemsController,
  saveItemController,
};
