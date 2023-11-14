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

    db.query('SELECT email from users WHERE email = ?', [email], (error, results) =>{
        if(error){
            console.log(error)
        }
        if(results.length > 0){
            return res.render('register', {
                message: 'Email ini sudah digunakan'
            })
        }
    }) 

    res.send("Form dikumpulkan");
}