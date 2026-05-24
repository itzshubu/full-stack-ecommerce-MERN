// third party modules
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer")
const authMiddleware = require("./middleware/auth.js")
const { sanitizeUser } = require("./utils/cartHelpers.js")

// local modules
const Product = require("./models/products.model.js")
const User = require("./models/UserModel.js")
const OTP = require("./models/otpmodel.js")
const UserRoutes = require("./Routes/UserRoutes.js")

mongoose.set('strictPopulate', false)
dotenv.config()

const app = express() 
const port = process.env.PORT || 3000
const MONGODB_URI = process.env.MONGODB_URI
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

app.use(cors({ origin: CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 30 * 24 * 60 * 60 * 1000,
}

// Prevent crashes from unhandled async errors
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err?.message || err)
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err?.message || err)
})

const connectToMongo = async (retries = 3) => {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is missing in .env')
  }

  const options = {
    serverSelectionTimeoutMS: 20000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await mongoose.connect(MONGODB_URI, options)
      console.log('MongoDB Connected...')
      return
    } catch (err) {
      console.error(`MongoDB connect attempt ${attempt}/${retries} failed:`, err.message)
      if (attempt === retries) throw err
      await new Promise((resolve) => setTimeout(resolve, 2000 * attempt))
    }
  }
}

mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected — check Atlas network access and internet connection')
})

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err.message)
})

// Block DB routes until MongoDB is ready
const ensureDb = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'Database not connected. Please try again in a few seconds.',
    })
  }
  next()
}

app.use('/user', ensureDb, UserRoutes)

const generaterandom = () => {
  let num = "0123456789"
  let otp = ""
  for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * 10)
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
})

app.get('/', (req, res) => {
  res.send('Hello World! you are at /')
})

app.get("/products", ensureDb, async (req, res) => {
  try {
    const allProducts = await Product.find({}).lean()
    res.status(200).json(allProducts)
  } catch (error) {
    console.error("Error in /products route:", error.message)
    res.status(500).json({ message: "Failed to fetch products.", error: error.message })
  }
})

app.post('/send-otp', ensureDb, async (req, res) => {
  try {
    const { email } = req.body
    if (!email) {
      return res.status(400).send({ message: 'email is required!' })
    }

    const otp = generaterandom()
    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: email,
      subject: process.env.EMAIL_SUBJECT || "Your OTP",
      text: `your otp is ${otp}`,
    }

    await OTP.findOneAndUpdate({ email }, { email, otp }, { upsert: true, new: true })
    await transporter.sendMail(mailOptions)
    res.send({ message: "otp send successfullyy..." })
  } catch (error) {
    console.error('send-otp error:', error.message)
    res.status(500).send({ message: "internal server error" })
  }
})

app.post('/signup', ensureDb, async (req, res) => {
  try {
    const { fullName, email, password, otp } = req.body

    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "user already register!" })
    }

    const otpobj = await OTP.findOne({ email })
    if (!otpobj || otpobj.otp != otp) {
      return res.status(401).send({ message: "incorrect credentials !" })
    }

    const usernew = new User({ fullName, email, password })
    await usernew.save()

    res.status(200).json({ message: "user sign in successfull..." })
  } catch (error) {
    console.error('signup error:', error.message)
    res.status(500).send({ message: "internal server error!" })
  }
})

app.post('/login', ensureDb, async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email }).populate('cart.producttId')
    if (!user) {
      return res.status(404).send({ message: "user not found!" })
    }
    if (user.password != password) {
      return res.status(401).send({ message: "incorrect email or password!" })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN || '30d',
    })

    res.cookie('token', token, cookieOptions)

    res.status(200).send({
      message: "user login successfullyyy...",
      user: sanitizeUser(user),
    })
  } catch (error) {
    console.error('login error:', error.message)
    res.status(500).send({ message: "internal server error!" })
  }
})

app.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  })
  res.status(200).json({ message: 'Logged out successfully' })
})

app.get('/user/me', ensureDb, authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.status(200).json({ user: sanitizeUser(user) })
  } catch (error) {
    console.error('GET /user/me error:', error.message)
    res.status(500).json({ message: 'Failed to fetch user' })
  }
})

app.get("*", (req, res) => {
  res.status(404).send('this route cannot be accesable')
})

const startServer = async () => {
  try {
    await connectToMongo()
    app.listen(port, () => {
      console.log(`Server running on port ${port} (${process.env.NODE_ENV || 'development'})`)
    })
  } catch (err) {
    console.error('Failed to start server:', err.message)
    console.error('Check MONGODB_URI, Atlas IP whitelist (0.0.0.0/0 for dev), and cluster status.')
    process.exit(1)
  }
}

startServer()
