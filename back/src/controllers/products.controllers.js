const logger = require("../utils/logger");
const productService = require("../services/products.service");
const validator = require("express-validator");

const getProductsController = async (req, res) => {
  try {
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

const getProductByIdController = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId || isNaN(productId)) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const product = await productService.getProductById(productId);

    return res.status(200).json(product);
  } catch (error) {
    logger.error("productController.getProductById : " + error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createProductController = async (req, res) => {
  try {
    const validatorErrors = validator.validationResult(req);

    console.log(validatorErrors);

    if(!validatorErrors.isEmpty()){
      return res.status(400).json({ errors: validatorErrors.array() });      
    }

    return res.status(200).json({});
  } catch (error) {
    logger.error("productController.createProductController : " + error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getProductsController,
  getProductByIdController,
  createProductController,
};
