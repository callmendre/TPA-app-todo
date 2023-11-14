const express = require('express')
const path = require('path')
const mysql = require('mysql')
const dotenv =  require('dotenv')

dotenv.config({path: './.env'})


const app = express() 
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_user,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname, )
console.log(__dirname)

app.set('view engine', 'hbs');

db.connect((error) =>{
    if(error){
        console.log(error)
    }else{
        console.log('MYSQL Connected..')
    }
})



app.get('/', (req, res) =>{
    res.send("<h1>Home page</h1>")
})

app.listen(5000, () =>{
    console.log("Server starter on port 5000")
})