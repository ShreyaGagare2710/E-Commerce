const express = require("express");
const router = express.Router();
const categoryController = require("../Controllers/categoryController");
const auth = require("../Middleware/auth");

router.get("/", categoryController.getAllCategories);
router.post("/", auth(["admin"]), categoryController.createCategory);
router.put("/:id", auth(["admin"]), categoryController.updateCategory);
router.delete("/:id", auth(["admin"]), categoryController.deleteCategory);

module.exports = router;
