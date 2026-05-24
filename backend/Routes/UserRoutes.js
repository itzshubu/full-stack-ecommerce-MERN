const express = require("express");
const router = express.Router();
const User = require("../models/UserModel.js");
const Product = require("../models/products.model.js");
const authMiddleware = require("../middleware/auth.js");
const { formatCart } = require("../utils/cartHelpers.js");

router.use(authMiddleware);

// GET /user/cart — fetch cart with populated products
router.get("/cart", async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("cart.producttId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ cart: formatCart(user.cart) });
  } catch (error) {
    console.error("GET /user/cart error:", error.message);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
});

// POST /user/cart/add — body: { productId, quantity? }
router.post("/cart/add", async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const qty = Math.max(1, Number(quantity) || 1);

    if (!productId) {
      return res.status(400).json({ message: "productId is required" });
    }

    const product = await Product.findOne({ productId: Number(productId) });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existing = user.cart.find(
      (item) => item.producttId?.toString() === product._id.toString()
    );

    if (existing) {
      existing.quentity += qty;
    } else {
      user.cart.push({ producttId: product._id, quentity: qty });
    }

    await user.save();

    const updated = await User.findById(req.userId).populate("cart.producttId");
    res.status(200).json({
      message: "Item added to cart",
      cart: formatCart(updated.cart),
    });
  } catch (error) {
    console.error("POST /user/cart/add error:", error.message);
    res.status(500).json({ message: "Failed to add item to cart" });
  }
});

// PATCH /user/cart/:productId — body: { quantity }
router.patch("/cart/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const qty = Number(quantity);

    if (!qty || qty < 1) {
      return res.status(400).json({ message: "quantity must be at least 1" });
    }

    const product = await Product.findOne({ productId: Number(productId) });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const item = user.cart.find(
      (entry) => entry.producttId?.toString() === product._id.toString()
    );

    if (!item) {
      return res.status(404).json({ message: "Item not in cart" });
    }

    item.quentity = qty;
    await user.save();

    const updated = await User.findById(req.userId).populate("cart.producttId");
    res.status(200).json({
      message: "Cart updated",
      cart: formatCart(updated.cart),
    });
  } catch (error) {
    console.error("PATCH /user/cart error:", error.message);
    res.status(500).json({ message: "Failed to update cart" });
  }
});

// DELETE /user/cart/:productId
router.delete("/cart/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findOne({ productId: Number(productId) });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.cart = user.cart.filter(
      (entry) => entry.producttId?.toString() !== product._id.toString()
    );
    await user.save();

    const updated = await User.findById(req.userId).populate("cart.producttId");
    res.status(200).json({
      message: "Item removed from cart",
      cart: formatCart(updated.cart),
    });
  } catch (error) {
    console.error("DELETE /user/cart error:", error.message);
    res.status(500).json({ message: "Failed to remove item from cart" });
  }
});

module.exports = router;
