const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Calculate total amount from cart items
    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Create the order
    const order = await Order.create({
      userId: req.params.userId,
      items: cart.items,
      totalAmount: parseFloat(totalAmount.toFixed(2)), // rounded
      status: "pending",
    });

    // Clear the cart
    await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      { items: [] }
    );

    res.status(201).json(order);
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
};

exports.getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.orderId);
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
};

exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.orderId, { status: req.body.status }, { new: true });
  res.json(order);
};
