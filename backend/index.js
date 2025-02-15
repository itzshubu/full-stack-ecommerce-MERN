// third party modules
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

// local modules
const Product = require("./models/products.model.js")
const User = require("./models/UserModel.js")


const app = express()
const port = 3000
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI;
const localuri = "mongodb://localhost:27017/e-comdb"

// middlewares
app.use(cors())
app.use(express.json())

// connecting to mongodb
async function contomongo() {
    try {
      var db =  await mongoose.connect(MONGODB_URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        });
        console.log("MongoDB Connected...");
      } catch (err) {
        console.error("Database Connection Error:", err.message);
        process.exit(1); // Exit process on failure
      }
}
contomongo()


app.get('/', (req, res) => {
    res.send('Hello World! you are at /')
})// Cleaned GET Route to Add and Fetch Products
app.get("/products", async (req, res) => {
  try {
      // Check if products already exist
      let existingProducts = await Product.find({});

      // If no products, insert new ones
      // if (existingProducts.length === 0) {
          let newProducts = [{
            "productId": 1,
            "name": "Slim Fit Casual Shirt",
            "main_category": "Men's Wear",
            "subcategory": "Shirts",
            "type": "upper",
            "image": "https://m.media-amazon.com/images/I/81FPwnSfn0L._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 4,
            "price": 29.99,
            "description": "A stylish slim-fit casual shirt, perfect for both office and weekend wear. Made with breathable cotton fabric."
          },
          {
            "productId": 2,
            "name": "Classic Blue Denim Jeans",
            "main_category": "Men's Wear",
            "subcategory": "Jeans",
            "type": "bottom",
            "image": "https://m.media-amazon.com/images/I/31rimpztTPL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 3,
            "price": 39.99,
            "description": "Classic blue denim jeans with a modern fit. Durable and comfortable, ideal for everyday use."
          },
          {
            "productId": 3,
            "name": "Black Leather Jacket",
            "main_category": "Men's Wear",
            "subcategory": "Jackets",
            "type": "upper",
            "image": "https://m.media-amazon.com/images/I/51hemTr7IAL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 5,
            "price": 149.99,
            "description": "A premium quality black leather jacket, designed to provide both warmth and style for the colder months."
          },
          {
            "productId": 4,
            "name": "Cotton Polo Shirt",
            "main_category": "Men's Wear",
            "subcategory": "T-Shirts",
            "type": "upper",
            "image": "https://m.media-amazon.com/images/I/713n+TxyfCL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 4,
            "price": 24.99,
            "description": "A comfortable cotton polo shirt, available in multiple colors. A versatile piece for both casual and semi-casual outfits."
          },
          {
            "productId": 5,
            "name": "Chino Shorts Mens",
            "main_category": "Men's Wear",
            "subcategory": "Shorts",
            "type": "bottom",
            "image": "https://m.media-amazon.com/images/I/61gpYkYuGtL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 3,
            "price": 34.99,
            "description": "Stylish chino shorts made from lightweight fabric, perfect for summer outings and casual wear."
          },
          {
            "productId": 6,
            "name": "Wool Blend Blazer",
            "main_category": "Men's Wear",
            "subcategory": "Blazers",
            "type": "upper",
            "image": "https://m.media-amazon.com/images/I/61SW9FSb-9L._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 2,
            "price": 119.99,
            "description": "A tailored wool blend blazer, offering a sophisticated look. Ideal for formal occasions or business meetings."
          },
          {
            "productId": 7,
            "name": "Athletic Sweatpants",
            "main_category": "Men's Wear",
            "subcategory": "Pants",
            "type": "bottom",
            "image": "https://m.media-amazon.com/images/I/51uilb9h0FL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 4,
            "price": 39.99,
            "description": "Comfortable athletic sweatpants designed for workouts or lounging. Made with soft, stretchable fabric."
          },
          {
            "productId": 8,
            "name": "V-Neck Sweater",
            "main_category": "Men's Wear",
            "subcategory": "Sweaters",
            "type": "upper",
            "image": "https://m.media-amazon.com/images/I/61kPNR1yb7L._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 3,
            "price": 49.99,
            "description": "A cozy v-neck sweater made from soft wool material. Perfect for layering over shirts or wearing on its own."
          },
          {
            "productId": 9,
            "name": "Running Sneakers",
            "main_category": "",
            "subcategory": "Footwear",
            "type": "Bag",
            "image": "https://m.media-amazon.com/images/I/51xvk62piKL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 4,
            "price": 69.99,
            "description": "High-performance running sneakers designed for comfort and durability. Ideal for both sports and casual wear."
          },
          {
            "productId": 10,
            "name": "Casual Canvas Backpack",
            "main_category": "Men's Wear",
            "subcategory": "Bags",
            "type": "Bag",
            "image": "https://m.media-amazon.com/images/I/7168gOptS8L._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 4,
            "price": 39.99,
            "description": "A trendy and durable canvas backpack with plenty of space for all your essentials. Ideal for daily use or travel."
          },
          {
            "productId": 11,
            "name": "Floral Print Summer Dress",
            "main_category": "Women's Wear",
            "subcategory": "Dresses",
            "type": "Womenwestern",
            "image": "https://m.media-amazon.com/images/I/81l0Hv8qQwL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 4,
            "price": 49.99,
            "description": "A vibrant floral print summer dress, perfect for outdoor events and warm weather."
          },
          {
            "productId": 12,
            "name": "High-Waisted A-Line Skirt",
            "main_category": "Women's Wear",
            "subcategory": "Skirts",
            "type": "WomenEthnic",
            "image": "https://m.media-amazon.com/images/I/41S33c441oL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 3,
            "price": 34.99,
            "description": "A flattering high-waisted A-line skirt that pairs perfectly with both casual and dressy tops."
          },
          {
            "productId": 13,
            "name": "Silk Blouse with Lace Detail",
            "main_category": "Women's Wear",
            "subcategory": "Blouses",
            "type": "Womenwestern",
            "image": "https://m.media-amazon.com/images/I/71T+BRpVXvL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 4,
            "price": 59.99,
            "description": "A luxurious silk blouse with delicate lace detailing, ideal for both work and formal events."
          },
          {
            "productId": 14,
            "name": "Slim Fit Black Trousers",
            "main_category": "Women's Wear",
            "subcategory": "Pants",
            "type": "WomenEthnic",
            "image": "https://m.media-amazon.com/images/I/71CpREagR0L._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 4,
            "price": 44.99,
            "description": "Chic and versatile slim-fit black trousers, perfect for office wear or evening outings."
          },
          {
            "productId": 15,
            "name": "Button-Down Denim Shirt",
            "main_category": "Women's Wear",
            "subcategory": "Shirts",
            "type": "Womenwestern",
            "image": "https://m.media-amazon.com/images/I/71OuxvTpC-L._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 3,
            "price": 39.99,
            "description": "A classic button-down denim shirt with a relaxed fit, ideal for casual and smart-casual occasions."
          },
          {
            "productId": 16,
            "name": "Maxi Dress with Pockets",
            "main_category": "Women's Wear",
            "subcategory": "Dresses",
            "type": "WomenEthnic",
            "image": "https://m.media-amazon.com/images/I/71ja3Q1qaTL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 3,
            "price": 69.99,
            "description": "A comfortable and stylish maxi dress with pockets, perfect for beach days or casual outings."
          },
          {
            "productId": 17,
            "name": "Striped Long Sleeve Top",
            "main_category": "Women's Wear",
            "subcategory": "Tops",
            "type": "WomenEthnic",
            "image": "https://m.media-amazon.com/images/I/71mJZiP4ZTL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 4,
            "price": 29.99,
            "description": "A simple yet stylish striped long sleeve top, ideal for layering or wearing on its own."
          },
          {
            "productId": 18,
            "name": "Belted Wrap Skirt",
            "main_category": "Women's Wear",
            "subcategory": "Skirts",
            "type": "Womenwestern",
            "image": "https://m.media-amazon.com/images/I/41j7pL06yxL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 4,
            "price": 49.99,
            "description": "A trendy belted wrap skirt with a flattering fit, perfect for both casual and business wear."
          },
          {
            "productId": 19,
            "name": "Chiffon Off-Shoulder Top",
            "main_category": "Women's Wear",
            "subcategory": "Tops",
            "type": "WomenEthnic",
            "image": "https://m.media-amazon.com/images/I/719o-598IlL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 3,
            "price": 39.99,
            "description": "A breezy chiffon off-shoulder top, ideal for hot summer days or evenings out."
          },
          {
            "productId": 20,
            "name": "Cropped Sweater with Puff Sleeves",
            "main_category": "Women's Wear",
            "subcategory": "Sweaters",
            "type": "WomenEthnic",
            "image": "https://m.media-amazon.com/images/I/51sg+JAO1fL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 4,
            "price": 54.99,
            "description": "A stylish cropped sweater with puff sleeves, perfect for layering in cooler months."
          },
          {
            "productId": 21,
            "name": " Performance Goggles",
            "main_category": "Accessories",
            "subcategory": "Goggles",
            "type": "Goggles",
            "image": "https://m.media-amazon.com/images/I/61+THk53YIL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 3,
            "price": 79.99,
            "description": "High-performance goggles designed for sports enthusiasts, with anti-fog and UV protection."
          },
          {
            "productId": 22,
            "name": "ELEGANTE Goggles ",
            "main_category": "Accessories",
            "subcategory": "Goggles",
            "type": "Goggles",
            "image": "https://m.media-amazon.com/images/I/515gKnUgwpL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 4,
            "price": 19.99,
            "description": "Comfortable swimming goggles with an adjustable strap and anti-leak design for a secure fit."
          },
          {
            "productId": 23,
            "name": "Fashion Sunglasses Goggles",
            "main_category": "Accessories",
            "subcategory": "Goggles",
            "type": "Goggles",
            "image": "https://m.media-amazon.com/images/I/61MMoCNeXzL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 3,
            "price": 29.99,
            "description": "Trendy sunglasses with goggle-style frames, perfect for outdoor activities and fashion-forward looks."
          },
          {
            "productId": 24,
            "name": "Polarized Outdoor Goggles",
            "main_category": "Accessories",
            "subcategory": "Goggles",
            "type": "Goggles",
            "image": "https://m.media-amazon.com/images/I/41KML+1HubL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 4,
            "price": 59.99,
            "description": "Polarized goggles designed for outdoor adventures, offering protection against glare and harmful UV rays."
          },
          {
            "productId": 25,
            "name": "Anti-Fog Ski Goggles",
            "main_category": "Accessories",
            "subcategory": "Goggles",
            "type": "Goggles",
            "image": "https://m.media-amazon.com/images/I/41vp+0Nq--L._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 3,
            "price": 89.99,
            "description": "High-quality ski goggles with anti-fog coating and UV protection, perfect for skiing and snowboarding."
          },
          {
            "productId": 26,
            "name": "Wireless Boat Cancelling Headphones",
            "main_category": "Electronics",
            "subcategory": "Headphones",
            "image": "https://m.media-amazon.com/images/I/61WOKwqQDwL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 4,
            "price": 149.99,
            "description": "Premium wireless noise-cancelling headphones with superior sound quality and up to 30 hours of battery life."
          },
          {
            "productId": 27,
            "name": "Smartwatch with Heart Rate Monitor",
            "main_category": "Electronics",
            "subcategory": "Smartwatches",
            "image": "https://m.media-amazon.com/images/I/610BF3kqBZL._AC_UY327_FMwebp_QL65_.jpg",
            "rating": 3,
            "price": 129.99,
            "description": "A feature-packed smartwatch with heart rate monitoring, fitness tracking, and seamless smartphone integration."
          },
          {
            "productId": 28,
            "name": "4K Ultra HD TV",
            "main_category": "Electronics",
            "subcategory": "Television",
            "image": "data:image/jpeg;base64,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",
            "rating": 4,
            "price": 599.9,
            "description": "Enjoy cinematic-quality viewing with this 4K Ultra HD Smart TV, complete with built-in streaming apps and voice control."
          },
          {
            "productId": 29,
            "name": "Portable Bluetooth Speaker",
            "main_category": "Electronics",
            "subcategory": "Speakers",
            "image": "https://m.media-amazon.com/images/I/7145QM-EBcL._AC_UY327_FMwebp_QL65_.jpg",
            "rating": 5,
            "price": 49.99,
            "description": "Compact, portable Bluetooth speaker with rich sound quality, waterproof design, and up to 12 hours of playtime."
          },
          {
            "productId": 30,
            "name": "Wireless Charging Pad",
            "main_category": "Electronics",
            "subcategory": "Chargers",
            "image": "https://m.media-amazon.com/images/I/71O59aVg-cL._AC_UY327_FMwebp_QL65_.jpg",
            "rating": 3,
            "price": 19.99,
            "description": "Efficient wireless charging pad compatible with Qi-enabled devices. Fast charging and sleek design."
          },
          {
            "productId": 31,
            "name": "Sterling Silver Engagement Ring",
            "main_category": "Jewelry",
            "subcategory": "Rings",
            "image": "https://m.media-amazon.com/images/I/51Sutvw+pzL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 3,
            "price": 299.99,
            "description": "A stunning sterling silver engagement ring with a brilliant round-cut diamond, designed to symbolize eternal love."
          },
          {
            "productId": 32,
            "name": "Gold-Plated Wedding Band",
            "main_category": "Jewelry",
            "subcategory": "Rings",
            "image": "https://m.media-amazon.com/images/I/61O2DeeWuhL._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 3,
            "price": 149.99,
            "description": "A classic gold-plated wedding band with a smooth finish, perfect for couples who appreciate timeless elegance."
          },
          {
            "productId": 33,
            "name": "Vintage Ruby Cocktail Ring",
            "main_category": "Jewelry",
            "subcategory": "Rings",
            "image": "https://m.media-amazon.com/images/I/51e5AYJms3L._AC_UL480_FMwebp_QL65_.jpg",
            "rating": 3,
            "price": 199.99,
            "description": "A vintage-inspired ruby cocktail ring featuring intricate detailing, perfect for a statement piece at any special occasion."
          },
          {
            "productId": 34,
            "name": "Casual Wear",
            "main_category": "Men's Wear",
            "subcategory": "T-Shirts",
            "type": "upper",
            "image": "https://shopsy-tcj.netlify.app/assets/shirt-cwf9SKdB.png",
            "rating": 5,
            "price": 24.99,
            "description": "A comfortable cotton polo shirt, available in multiple colors. A versatile piece for both casual and semi-casual outfits."
          },
          {
            "productId": 35,
            "name": "Printed shirt",
            "main_category": "Men's Wear",
            "subcategory": "Printed Shirts",
            "type": "upper",
            "image": "https://shopsy-tcj.netlify.app/assets/shirt2-XQzG6elp.png",
            "rating": 5,
            "price": 54.99,
            "description": "A comfortable cotton polo shirt, available in multiple colors. A versatile piece for both casual and semi-casual outfits."
          },
          {
            "productId": 36,
            "name": "Mens shirt",
            "main_category": "Men's Wear",
            "subcategory": "T-Shirts",
            "type": "upper",
            "image": "https://shopsy-tcj.netlify.app/assets/shirt3-HwQ10bVo.png",
            "rating": 5,
            "price": 32.99,
            "description": "A comfortable cotton polo shirt, available in multiple colors. A versatile piece for both casual and semi-casual outfits."
          }]

          // Insert new products into MongoDB Atlas
          // await Product.insertMany(newProducts); 
          // console.log("Products added to MongoDB Atlas.");
      // } else {
      //     console.log("Products already exist in MongoDB Atlas.");
      // }
      // Fetch all products and send as response
      let allProducts = await Product.find({});
      res.status(200).json(allProducts);
  } catch (error) {
      console.error("Error in /products route:", error);
      res.status(500).json({ message: "Failed to fetch or add products." });
  }
});

app.post('/signup', async (req, res) => {
    const {fullname, email,password} = req.body
     let user = User.find({email})
     if(user.length > 0){
        res.status(400).json({message : "user already register!"})
     }
     let hashedpass = await bcrypt.hash(password , 10)
      user = await new User({name : fullname , email , password : hashedpass})
      user.save()  
      
    res.status(200).json({message : "user sign in successfull..."})
})

app.post('/login', async(req , res)=>{
    try {
        let {email , password} = req.body
        console.log(email , password)
        let user = await User.find({email})
        console.log("user",user)
        if(!(user.length > 0)){
           res.status(400).json({message : "please sign up first !"})
        } else{   
            let matched = await bcrypt.compare(password ,user[0].password)
            console.log(matched)
            if(!matched){
                res.status(400).json({message : "wrong credentials!!"})
            }else{
                let token = jwt.sign({userId :user[0]._id},"helloiamshubham",{
                    expiresIn:"10d"
                   })
                console.log(token , typeof user , user[0])
                 user = user[0]
                //  console.log( "hello",user.toObject())
                // delete user.password
                // console.log("hiiuser" ,user)
                res.status(200).json({message :"you login success" ,token, user})
            } 
        }
    } catch (error) {
         res.status(500).json({message : "internal server error"})
    }
})

app.get("*", (req, res) => {
    res.send('this route cannot be accesable')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})