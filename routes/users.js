const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const userModel = require('../models')


router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/register', (req, res) => {
    res.render('register')
});


router.post('/register', (req, res) => {
    userModel.users.findOne({   
        where: {
            user_name: req.body.user_name
        }
    }).then(user => {
        console.log(user.user_name)
        res.render('template', {
            message: "Registered!"
        })
    })
});


router.get('/dashboard', (req, res) => {
    res.render('dashboard')
});

module.exports = router