const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productController");
const auth = require("../Middleware/auth");



router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", auth(["admin"]), productController.createProduct);
router.put("/:id", auth(["admin"]), productController.updateProduct);
router.delete("/:id", auth(["admin"]), productController.deleteProduct);

module.exports = router;
