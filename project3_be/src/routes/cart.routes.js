const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart.controller");

router.post("/get", cartController.get);

router.post("/add-item", cartController.addItem);

router.post("/update", cartController.update);

router.delete("/delete-item/:itemId", cartController.deleteItem);

router.delete("/delete-cart", cartController.deleteCart);

module.exports = router;
