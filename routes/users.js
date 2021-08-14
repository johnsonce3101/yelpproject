const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/register', (req, res) => {
    res.render('register')
});

router.post('/register', (req, res) => {
    let { name, email, password, password2 } = req.body;

    console.log({
        name,
        email,
        password,
        password2
    })
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard')
});

module.exports = router