// third party modules
const express = require('express')
const cors = require('cors')
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

// local modules
const Product = require("./models/products.model.js")
const User = require("./models/UserModel.js")


const app = express()
const port = 3000

// middlewares
app.use(cors())
app.use(express.json())

// connecting to mongodb
async function contomongo() {
    try {
      var db =  await mongoose.connect("mongodb://localhost:27017/e-comdb", {
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
})

app.get("/products", async (req, res) => {
       let products = await Product.find({})
       console.log(products)
    res.status(200).json(products)
})

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
                let token = 8347598437843
                let user1 = {name :"shubham",cartdata : [{},{},{}]}
                res.status(200).json({message :"you login success" ,token, user1})
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