const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId: { type: Number,},
  name: { type: String,},
  main_category: { type: String,},
  subcategory: { type: String,},
  type: { type: String,},
  image: { type: String,},
  rating: { type: Number, min: 0, max: 5 },
  price: { type: Number,},
  description: { type: String,},
});

const Product = mongoose.model("ProductAll", ProductSchema);

module.exports = Product;
