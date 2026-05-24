/**
 * Marks products as "featured" for the Explore page.
 * Run once: node scripts/markFeaturedProducts.js
 *
 * Featured productIds: 1, 3, 9, 11, 26, 27, 37, 41
 * (mix of fashion, electronics, grocery, fruits)
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') })
const mongoose = require('mongoose')
const Product = require('../models/products.model.js')

const featuredIds = [1, 3, 9, 11, 26, 27, 37, 41]

async function run() {
  await mongoose.connect(process.env.MONGODB_URI)

  await Product.updateMany({}, { $set: { featured: false } })

  const result = await Product.updateMany(
    { productId: { $in: featuredIds } },
    { $set: { featured: true } }
  )

  console.log('Featured products updated:', result.modifiedCount)
  const featured = await Product.find({ featured: true }).select('productId name')
  featured.forEach((p) => console.log(' -', p.productId, p.name))

  await mongoose.disconnect()
}

run().catch((e) => {
  console.error(e.message)
  process.exit(1)
})
