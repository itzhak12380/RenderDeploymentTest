require('dotenv').config()
const express = require("express")
const cors = require("cors")
const cookieParser = require('cookie-parser')
const fileUpload = require("express-fileupload")
const path = require('path');
const fs = require('fs')
require('./DB/index')
const app = express()
app.use(fileUpload({ createParentPath: true,useTempFiles:true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.json({ msg: "server is on" })
})

// import routes
const userRouter = require('./routes/userRouter')
const categoryRouter = require('./routes/categoryRouter')
const uploadRouter = require('./routes/uploadRouter')
const productRouter = require('./routes/productRouter')
const paymentRouter = require('./routes/paymentRouter')


// user router
app.use('/user', userRouter)
app.use('/api', categoryRouter)
app.use('/api', uploadRouter)
app.use('/api', productRouter)
app.use('/api', paymentRouter)



// if(process.env.NODE_ENV === 'production'){
//     app.use(express.static('client/build'))
//     app.get("*",(req,res)=>{
//         res.sendFile(path.join(__dirname,'client','build','index'))
//     })
// }
if (process.env.NODE_ENV === 'production'){ 
    app.use(express.static(path.join(__dirname,'../client/build')))
    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname, '../client/build','index.html'))
    });
} else {
    app.get('/', (req,res) =>{
        res.send("Api running")
    })
}

const PORT = process.env.port || 5000
app.listen(PORT, (error) => {
    if (error) throw error
    console.log("server is up on port " + PORT);
})