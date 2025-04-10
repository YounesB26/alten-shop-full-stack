const express = require("express");
const { authentication } = require("../middlewares/auth.middleware");
const {
  getCartController,
  saveCartController,
} = require("../controllers/cart.controller");
const router = express.Router();

router.use(authentication);

router.get("/", getCartController);
router.post("/", saveCartController);

module.exports = router;
