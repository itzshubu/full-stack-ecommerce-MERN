const express = require('express')
const cors = require('cors')
const path = require("path")
const app = express()
const port = 3000  

app.use(express.static('public'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded())


console.log(__dirname)
app.use((req , res ,next)=>{
   console.log(req.query)
   let validkeys = [
    '1234' , '1111' ,'2222' ,'2332'
   ]
   let data = validkeys.find((item)=>{
          return item == req.query.key
   })
   console.log(data)
   if(data){
       next()
   } else {
    res.send("invalid key")
   }
})



app.get('/', (req, res) => {
    // res.send('Hello World! you are at /')
    res.sendFile(path.join(__dirname , "/public/index.html"))
})

app.get('/name/:cname/:2ndname',(req , res)=>{
    let a = [
        {name : "india",
            message : "hello india"
        },
        {name : "pakistan",
            message : "hello pakistan"
        }, 
         {name : "bhutan",
            message : "hello bhutan"
        },,
        {name : "shrilanka",
            message : "hello shrilanka"
        },
    ]
    let country = a.filter((item)=>{
            return item.name == req.params.cname
    })
    console.log(req.params , req.query)
       res.json(country)
})

app.get('/products', (req, res) => {
    let a = [
        { id: 1 },
        { id: 2 },
        { id: 3 }
    ]    
    // res.send(JSON.stringify(a))
    res.json(a)
})

app.post('/signup', (req , res)=>{
    console.log(req.body)
    res.send('i get data succesfully!')
}) 
   
app.get("*",(req, res)=>{
    res.send('this route cannot be accesable')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})