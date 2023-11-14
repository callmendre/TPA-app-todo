const mysql = require('mysql')

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_user,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.register = (req, res) =>{
    console.log(req.body)
    
    const { name, email,password } =    req.body;

    db.query() 

    res.send("Form dikumpulkan");
}