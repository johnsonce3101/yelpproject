const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const db = require('../models');
const Users = db.Users;
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');


router.use(bodyParser.json())

router.post('/login', (req, res, next) => {
    let { userName, password } = req.body;
    passport.authenticate('local',
        (err, user, info) => {
            if (err) { return next(err); }
            if (!user) {
                return res.send(info.message);
            }
            req.logIn(user, err => {
                if (err) {
                    return next(err);
                }
                console.log('user in login:', user)
                return res.send('Successfully Authenticated User');
            })
        }
    )(req, res, next);
});

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/register', (req, res) => {
    res.render('register')
});


router.post('/register', async (req, res) => {
    let{userName, password} = req.body
    let error;
    if (!userName || !password) {
        error ="Please have a brain and fill out the fields.";
    }
    if (password && password.length < 5) {
        error = "yeah thats secure... not. password must have a minimum of 5 characters."
    }
    if (userName && userName.length > 15) {
        error = "do you really want to type all that in every time? username must be less than 15 characters."
    }
    if (error) {
        res.send(error);
    } else {
        const newUser = await Users.findOne({
            where: {
                userName: userName
            },
        });
        if (newUser) {
            res.send(`${userName} already exists. please try again`)
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

