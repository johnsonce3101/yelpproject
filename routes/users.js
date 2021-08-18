const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/register', (req, res) => {
    res.render('register')
});


router.post('/register', async (req, res) => {
    
});


router.get('/dashboard', (req, res) => {
    res.render('dashboard')
});

module.exports = router