/**
 * Run once to add grocery / fruits / vegetables to MongoDB:
 * node scripts/seedGroceryProducts.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const mongoose = require('mongoose')
const Product = require('../models/products.model.js')

const products = [
  {
    productId: 37,
    name: "Wheat Flour",
    main_category: "Grocery",
    subcategory: "Grains",
    type: "grocery",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
    rating: 4,
    price: 12.99,
    description: "Fresh and organic wheat flour perfect for chapati and baking.",
  },
  {
    productId: 38,
    name: "Basmati Rice",
    main_category: "Grocery",
    subcategory: "Rice",
    type: "grocery",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
    rating: 5,
    price: 18.99,
    description: "Premium quality basmati rice with rich aroma and long grains.",
  },
  {
    productId: 39,
    name: "Sunflower Cooking Oil",
    main_category: "Grocery",
    subcategory: "Cooking Oil",
    type: "grocery",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
    rating: 4,
    price: 9.99,
    description: "Healthy sunflower oil suitable for all types of cooking.",
  },
  {
    productId: 40,
    name: "Brown Bread",
    main_category: "Grocery",
    subcategory: "Bakery",
    type: "grocery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400",
    rating: 4,
    price: 4.99,
    description: "Soft and healthy whole wheat brown bread for breakfast.",
  },
  {
    productId: 41,
    name: "Fresh Apple",
    main_category: "Fruits",
    subcategory: "Fresh Fruits",
    type: "fruits",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400",
    rating: 5,
    price: 3.99,
    description: "Fresh red apples packed with nutrients and natural sweetness.",
  },
  {
    productId: 42,
    name: "Banana",
    main_category: "Fruits",
    subcategory: "Fresh Fruits",
    type: "fruits",
    image: "https://images.unsplash.com/photo-1574226516831-e1dff420e37f?w=400",
    rating: 4,
    price: 2.99,
    description: "Organic bananas rich in potassium and energy.",
  },
  {
    productId: 43,
    name: "Mango",
    main_category: "Fruits",
    subcategory: "Seasonal Fruits",
    type: "fruits",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400",
    rating: 5,
    price: 5.99,
    description: "Sweet and juicy mangoes perfect for summer.",
  },
  {
    productId: 44,
    name: "Orange",
    main_category: "Fruits",
    subcategory: "Citrus Fruits",
    type: "fruits",
    image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=400",
    rating: 4,
    price: 4.49,
    description: "Fresh oranges rich in Vitamin C and antioxidants.",
  },
  {
    productId: 45,
    name: "Potato",
    main_category: "Vegetables",
    subcategory: "Root Vegetables",
    type: "vegetables",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
    rating: 4,
    price: 2.49,
    description: "Farm fresh potatoes suitable for all recipes.",
  },
  {
    productId: 46,
    name: "Tomato",
    main_category: "Vegetables",
    subcategory: "Fresh Vegetables",
    type: "vegetables",
    image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400",
    rating: 5,
    price: 3.49,
    description: "Fresh red tomatoes ideal for salads and curries.",
  },
  {
    productId: 47,
    name: "Carrot",
    main_category: "Vegetables",
    subcategory: "Root Vegetables",
    type: "vegetables",
    image: "https://images.unsplash.com/photo-1447175008436-054170c2e979?w=400",
    rating: 4,
    price: 2.99,
    description: "Healthy organic carrots rich in vitamins.",
  },
  {
    productId: 48,
    name: "Onion",
    main_category: "Vegetables",
    subcategory: "Fresh Vegetables",
    type: "vegetables",
    image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=400",
    rating: 4,
    price: 2.79,
    description: "Fresh onions directly sourced from local farms.",
  },
]

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI)
  for (const item of products) {
    await Product.findOneAndUpdate({ productId: item.productId }, item, {
      upsert: true,
      new: true,
    })
    console.log('Seeded:', item.productId, item.name)
  }
  console.log('Done —', products.length, 'products')
  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
