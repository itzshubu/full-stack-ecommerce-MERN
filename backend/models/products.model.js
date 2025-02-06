const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  main_category: { type: String, required: true },
  subcategory: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, required: true, min: 0, max: 5 },
  price: { type: Number, required: true },
  description: { type: String, required: true },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
