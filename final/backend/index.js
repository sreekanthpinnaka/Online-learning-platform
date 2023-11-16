const express= require('express')
const bodyParser = require('body-parser')
const { MongoClient } = require("mongodb");

const cors = require('cors')
const app = express() 
const mongoose = require('mongoose')
const apiPort = 8080;
const loginrouter= require('./routes/login_routes')
const uri = "mongodb+srv://User_sree:hsrpqwert1@cluster0.zodxr.mongodb.net/Email_IDS?retryWrites=true&w=majority"


app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())
app.use(bodyParser.json())

app.get('/',(req,res) =>{
        res.send('hello world')
})

app.use('/api',loginrouter)

app.listen(apiPort,() => console.log(`server started at port ${apiPort}`))
