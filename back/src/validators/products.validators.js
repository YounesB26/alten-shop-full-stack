const { body } = require("express-validator");

const productValidator = [
  body("id").notEmpty().withMessage("id is required"),
  body("code").notEmpty().withMessage("code is required"),
  body("name").notEmpty().withMessage("name is required"),
  body("description").notEmpty().withMessage("description is required"),
  body("image").notEmpty().withMessage("image is required"),
  body("category").notEmpty().withMessage("category is required"),
  body("price").notEmpty().withMessage("price is required"),
  body("quantity").notEmpty().withMessage("quantity is required"),
  body("internalReference")
    .notEmpty()
    .withMessage("internalReference is required"),
  body("shellId").notEmpty().withMessage("shellId is required"),
  body("inventoryStatus")
    .notEmpty()
    .withMessage("inventoryStatus is required")
    .isIn(["INSTOCK", "LOWSTOCK", "OUTOFSTOCK"])
    .withMessage(
      "inventoryStatus must be one of INSTOCK, LOWSTOCK, OUTOFSTOCK"
    ),
  body("rating").notEmpty().withMessage("rating is required"),
  body("createdAt").notEmpty().withMessage("createdAt is required"),
  body("updatedAt").notEmpty().withMessage("updatedAt is required"),
];

module.exports = productValidator;
