const express = require("express");
const router = express.Router();
const cartController = require("../Controllers/cartController");
const auth = require("../Middleware/auth");

router.get("/:userId", auth(), cartController.getCart);
router.post("/:userId", auth(), cartController.addToCart);
router.put("/:userId", auth(), cartController.updateCart);
router.delete("/:userId/:productId", auth(), cartController.removeItem);
router.delete("/:userId", auth(), cartController.clearCart);

module.exports = router;
