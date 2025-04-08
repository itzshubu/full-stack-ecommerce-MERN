const express = require('express')
let router = express.Router()
const Product = require("../models/products.model.js")
const User = require("../models/UserModel.js")
const mongoose = require("mongoose")


// router.put('/addtocart/:productId', async(req , res)=>{
//     console.log("i am add to cart")
//       let {productId} = req.params
//       console.log(req.body)
//       let {email} = req.body
//       let product = await Product.findById(productId)
//       console.log(product)
//       let user = await User.findOne({email})
//       user.cart.push({ productId :product._id, quantity : 1})
//       console.log(user)
//       user.save()
//     res.status(200).send({message : "item added successfully!"})
// })

 router.put('/addtocart/:id', async (req , res)=>{
        let cartItems = req.body
        let {id} = req.params
        const formattedcart = cartItems.map((item)=>{
          return {
            quentity :item.quentity,
            producttId : item._id
          }
        })
        console.log(formattedcart)
        await User.findByIdAndUpdate(id , {$set : {cart : formattedcart}})
        // let user = await User.findById(id)
        //  user.cart = req.body
        //  user.save()

         res.send({ message:'cart updated'})
 })

router.get("/" ,(req , res)=>{
    console.log("i am /")
    res.send("hello")
})

module.exports = router;