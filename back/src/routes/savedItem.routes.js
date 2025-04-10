const {
  getSavedItemsController,
  saveItemController,
} = require("../controllers/savedItem.controller");
const express = require("express");
const { authentication } = require("../middlewares/auth.middleware");
const router = express.Router();

router.use(authentication);
router.get("/", getSavedItemsController);
router.post("/", saveItemController);


module.exports = router;