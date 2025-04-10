const {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} = require("../controllers/products.controllers");
const { authentication, isAdmin } = require("../middlewares/auth.middleware");
const router = require("express").Router();

router.use(authentication);

router
  .route("/")
  .get(getProductsController)
  .post(isAdmin, createProductController);

router
  .route("/:id")
  .get(getProductByIdController)
  .patch(isAdmin, updateProductController)
  .delete(isAdmin, deleteProductController);

module.exports = router;
