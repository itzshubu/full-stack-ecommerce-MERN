// third party modules
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

// local modules
const Product = require("./models/products.model.js")
const User = require("./models/UserModel.js")
const OTP = require("./models/otpmodel.js")

const app = express()
const port = 3000
dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI;

// middlewares
app.use(cors())
app.use(express.json())

// connecting to mongodb
async function contomongo() {
    try {
        var db = await mongoose.connect(MONGODB_URI, {
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

// for otp 

const generaterandom = () => {
    let num = "0123456789"
    let otp = ""
    for (let i = 0; i < 4; i++) {
        let index = Math.floor(Math.random() * 10)
        otp += num[index]
    }
    return otp
}

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


app.get('/', (req, res) => {
    res.send('Hello World! you are at /')
})// Cleaned GET Route to Add and Fetch Products


app.get("/products", async (req, res) => {
    try {
        let allProducts = await Product.find({});
        // console.log(allProducts)
        res.status(200).json(allProducts);
    } catch (error) {
        console.error("Error in /products route:", error);
        res.status(500).json({ message: "Failed to fetch or add products." });
    }
});

app.post('/send-otp', async (req, res) => {
    try {
        console.log(req.body)
        let { email } = req.body
        if (!email) {
            res.status(400).send({ message: 'email is required!' })
            return
        }
        let otp = generaterandom()
        console.log(email)
        console.log(otp)
        const mailOptions = {
            from: "shubhamwebdev",
            to: email,
            subject: "Test Email from Nodemailer",
            text: `your otp is ${otp}`
        };
        let otpp = await OTP.findOneAndUpdate({ email }, { email, otp }, { upsert: true, new: true})
         console.log(otpp)   
        // otpp.save()
        await transporter.sendMail(mailOptions)
        res.send({ message: "otp send successfullyy..." })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "internal server error", error })
    }
})

app.post('/signup', async (req, res) => {
    const { fullName, email, password,otp } = req.body
    let user = User.findOne({ email })
    if (!user) {
        res.status(400).json({ message: "user already register!" })
    }
    let hashedpass = await bcrypt.hash(password, 10)
    user = await new User({fullName, email, password: hashedpass })
    user.save()

    res.status(200).json({ message: "user sign in successfull..." })
})

app.post('/login', async (req, res) => {
    try {
        let { email, password } = req.body
        console.log(email, password)
        let user = await User.find({ email })
        console.log("user", user)
        if (!(user.length > 0)) {
            res.status(400).json({ message: "please sign up first !" })
        } else {
            let matched = await bcrypt.compare(password, user[0].password)
            console.log(matched)
            if (!matched) {
                res.status(400).json({ message: "wrong credentials!!" })
            } else {
                let token = jwt.sign({ userId: user[0]._id }, "helloiamshubham", {
                    expiresIn: "10d"
                })
                console.log(token, typeof user, user[0])
                user = user[0]
                //  console.log( "hello",user.toObject())
                // delete user.password
                // console.log("hiiuser" ,user)
                res.status(200).json({ message: "you login success", token, user })
            }
        }
    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }
})

app.get("*", (req, res) => {
    res.send('this route cannot be accesable')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})