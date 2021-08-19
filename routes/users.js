const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const userModel = require('../models');


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
        if (!newUser) {
            const hashedPassword = await bcrypt.hash(password, 10);

            const createUser = await Users.create({
                name: name,
                email: email,
                userName: userName,
                password: hashedPassword
            });
            res.send(`Welcome! The user, ${userName}, was created.`);
        };
    }
});

router.get('/user', (reg, res) => {
    if (req.user) {
        res.send(req.user)
    }
    if (!req.user) { 
        res.send("user not logged");
    }
});
router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.status(200).send("logged out");
});
router.get('/status', (req, res) => {
    res.send(req.isAuthenticated())
});

module.exports = router;

