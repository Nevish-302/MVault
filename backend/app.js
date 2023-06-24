//The required Node Modules

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

app = express()

//To parse the form data

app.use(bodyParser.urlencoded({ extended: true })); 
app.use(bodyParser.json());     
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}))
app.use(cookieParser())

//Mongodb URI

const uri = `mongodb://127.0.0.1:27017/test`;
mongoose.connect(uri, {usenewUrlParser: true})
const connection = mongoose.connection
connection.once('open', ()=>
{
    console.log(`MongoDB connected successfully`);
})

//The routes
const auth = require(`./routes/userauth`)
const data = require('./routes/data')

//The routing of requests
app.use('/userauth', auth)
app.use('/data', data)

app.listen(5000, () => {
  console.log(`The server is listening on the port 5000`);
});
