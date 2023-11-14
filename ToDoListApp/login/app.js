const express = require('express')
const path = require('path')
const mysql = require('mysql')
const dotenv =  require('dotenv')
const todolistRouter = require('./routes/todolist');

dotenv.config({path: './.env'})


const app = express() 

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_user,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname, './public')


app.use(express.static(publicDirectory))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.set('view engine', 'hbs');
app.use('/todolist', todolistRouter);



db.connect((error) =>{
    if(error){
        console.log(error)
    }else{
        console.log('MYSQL Connected..')
    }
});

app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))

app.listen(5000, () =>{
    console.log("Server starter on port 5000")
})