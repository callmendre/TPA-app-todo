const express = require('express')
const router = express.Router()

router.get('/', (req, res) =>{
    res.render('index')
})

router.get('/register', (req, res) =>{
    res.render('register')
})

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/todolist', (req, res) => {
    // Ambil pesan dari parameter query
    const message = req.query.message;
    res.render('todolist', { message });
});

module.exports = router;