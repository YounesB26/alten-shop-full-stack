const userService = require("../services/users.service");
const cartService = require("../services/cart.service");
const cartSchema = require("../models/cart.schema");

const getCartController = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(400)
        .json({ error: "Login Required to retrieve user cart" });
    }

    const cart = await cartService.getCart(req.user.email);

    return res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const saveCartController = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(400).json({ error: "Login Required to save cart" });
    }

    if (!req.body) {
      return res.status(400).json({ error: "Request body is required" });
    }

    const { error } = cartSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    const user = await userService.getUser(req.user.email);

    if (!user || user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const savedCart = await cartService.saveCart(user[0], req.body);

    return res
      .status(200)
      .json({ message: "Cart saved successfully", cart: savedCart });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getCartController,
  saveCartController,
};
