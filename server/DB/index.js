require('dotenv').config()
const mongoose = require('mongoose')

const URL = process.env.MONGODBURL
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, (error) => {
    if (error) throw error
    console.log("connected to mongodb");
})