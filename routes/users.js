const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const userModel = require('../models');
//console.log(userModel);
//const users = require('../models/users')
const {restaurants} = require('../models');
console.log(restaurants);
router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/register', (req, res) => {
    res.render('register')
});


router.post('/register', (req, res) => {
    userModel.users.findAll({
        where: {
            name: req.body.name
        }
    }).then(user => {
        console.log(user.name)
        res.render('template', {
            message: "Registered!"
        })
    })
});


router.get('/dashboard', (req, res) => {
    res.render('dashboard')
});

module.exports = router