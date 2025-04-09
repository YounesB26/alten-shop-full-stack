const {
  getProductsController,
} = require("../controllers/products.controllers");
const productValidator = require("../validators/products.validators");
const logger = require("../utils/logger");
const router = require("express").Router();

router
  .route("/")
  .get(productValidator, getProductsController)
  .post(productValidator, (req, res) => {});
  
module.exports = router;
