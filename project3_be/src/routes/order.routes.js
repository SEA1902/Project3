const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

router.post("/create-order", orderController.create);

router.get("/get-recent-order/:userId", orderController.getRecentOrder);

router.get("/get-all-orders/:userId", orderController.getAllOrders);

router.post("/get-order/:userId", orderController.getOrder);

router.post("/delete-order", orderController.deleteOrder);

module.exports = router;
