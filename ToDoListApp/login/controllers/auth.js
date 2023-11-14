const mysql = require('mysql')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')



const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_user,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.register = (req, res) =>{
    console.log(req.body)
    
    const { name, email,password } =    req.body;

    db.query('SELECT email from users WHERE email = ?', [email], async (error, results) =>{
        if(error){
            console.log(error)
        }
        if(results.length > 0){
            return res.render('register', {
                message: 'Email ini sudah digunakan'
            })
        }

        //let hashedPassword = await bcrypt.hash(password, 8)
        //console.log(hashedPassword)

        db.query('INSERT INTO users SET ? ', {name: name, email:email, password:password},(error, results) =>{
            if(error){
                console.log(error)
            }else{
                console.log(results)
                return res.render('register', {
                    message: 'Berhasil ditambahkan'
            })
            }
        })
    })

}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login', {
                message: 'Masukkan email dan password.'
            });
        }

        db.query('SELECT * FROM users WHERE email = ?', [email], async (error, results) => {
            if (error) {
                console.log(error);
            }

            if (results.length === 0 || password !== results[0].password) {
                res.status(401).render('login', {
                message: 'Email atau password salah.'
            });
            } else {
                res.status(200).redirect('/todolist?message=Login berhasil');
            }

        });

    } catch (error) {
        console.log(error);
    }
};

