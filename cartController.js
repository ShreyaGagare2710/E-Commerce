const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const Product = require("../Models/Product");

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  res.json(cart || { userId: req.params.userId, items: [] });
};

// Add product into your cart

exports.addToCart = async (req, res) => {
  try {
    const { items } = req.body;
    const userId = req.params.userId;
    console.log(items)

    let cart = await Cart.findOne({ userId });

    for (const item of items) {
      const { productId, quantity } = item;

      // Validate and fetch product
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: `Product not found for ID: ${productId}` });
      }

      const price = product.price;

        // Create new cart if not exist

      if (!cart) {
      
        cart = await Cart.create({
          userId,
          items: [{ productId, quantity, price }],
        });
      } else {

        // Update or insert item

        const existingItem = cart.items.find((i) => i.productId.toString() === productId);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          cart.items.push({ productId, quantity, price });
        }
      }
    }

    await cart.save();

    // calculate total price

    const totalPrice = cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

    res.json({ cart, totalPrice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



exports.updateCart = async (req, res) => {
  const { items } = req.body;
  const cart = await Cart.findOneAndUpdate({ userId: req.params.userId }, { items }, { new: true });
  res.json(cart);
};

exports.removeItem = async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId });
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.filter((i) => i.productId != req.params.productId);
  await cart.save();
  res.json(cart);
};

exports.clearCart = async (req, res) => {
  await Cart.findOneAndUpdate({ userId: req.params.userId }, { items: [] });
  res.json({ message: "Cart cleared" });
};