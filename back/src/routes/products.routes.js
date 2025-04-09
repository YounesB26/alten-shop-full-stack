const {
  getProductsController,
  getProductByIdController,
  createProductController,
} = require("../controllers/products.controllers");
const productValidator = require("../validators/products.validators");
const router = require("express").Router();

router
  .route("/")
  .get(getProductsController)
  .post(productValidator, createProductController);

router.route("/:id").get(getProductByIdController);

module.exports = router;
