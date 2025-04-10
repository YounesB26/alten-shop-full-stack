const logger = require("../utils/logger");
const productService = require("../services/products.service");
const productSchema = require("../models/product.schema");

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
    if (!req.body) {
      return res.status(400).json({ error: "Request body is required" });
    }

    const productSchemaWithoutId = productSchema.fork(["id"], (schema) =>
      schema.optional().allow(null)
    );
    const { error } = productSchemaWithoutId.validate(req.body, {
      abortEarly: false,
    });

    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((e) => e.message) });
    }

    const product = await productService.addProduct(req.body);

    return res.status(201).json(product);
  } catch (error) {
    logger.error("productController.createProductController : " + error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateProductController = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is required" });
    }
    const productId = req.params.id;
    const data = req.body;

    if (!productId || isNaN(productId)) {
      return res
        .status(400)
        .json({ error: "Product ID is required and must be a number" });
    }

    const existingProduct = await productService.getProductById(productId);

    if (!existingProduct.length) {
      return res.status(404).json({ error: "Product not found to update!" });
    }

    const updatedProduct = { ...existingProduct[0], ...data };

    const { error } = productSchema.validate(updatedProduct);
    if (error) {
      return res
        .status(400)
        .json({ error: error.details.map((e) => e.message) });
    }
    const product = await productService.updateProduct(updatedProduct);

    return res.status(200).json(product);
  } catch (error) {
    logger.error("productController.updateProductController : " + error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteProductController = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId || isNaN(productId)) {
      return res.status(400).json({ error: "Product ID is required" });
    }

    const product = await productService.getProductById(productId);

    if (!product.length) {
      return res.status(404).json({ error: "No product to delete" });
    }

    await productService.deleteProduct(productId);

    return res.status(200).json({
      message: "Product deleted successfully!",
      deletedProduct: product[0],
    });
  } catch (error) {
    logger.error("productController.deleteProductController : " + error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
};
