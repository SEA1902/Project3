const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.post("/create-order", orderController.create);

router.get("/get-recent-order/:userId", orderController.getRecentOrder);

module.exports = router;
