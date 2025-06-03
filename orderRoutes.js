const express = require("express");
const router = express.Router();
const orderController = require("../Controllers/orderController");
const auth = require("../Middleware/auth");

router.post("/:userId", auth(), orderController.createOrder);
router.get("/:userId", auth(), orderController.getUserOrders);
router.get("/detail/:orderId", auth(), orderController.getOrderById);
router.put("/:orderId/status", auth(["admin"]), orderController.updateOrderStatus);

module.exports = router;
