const logger = require("../utils/logger");
const productService = require("../services/products.service");

const getProductsController = async (req, res) => {
  try {
    if (!process.env.API_URI) {
      throw new Error("API_URI is not defined in environment variables.");
    }

    const products = await productService.getProducts();

    if (!products) {
      return res.status(404).json({ error: "Products not found" });
    }

    res.status(200).json(products);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getProductsController,
};
