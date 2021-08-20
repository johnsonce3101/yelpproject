const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const db = require('../models');
const Users = db.users;
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const ensureAuthenticated = require('../routes/ensureAuthenticated');
const passport = require('passport');
router.use(bodyParser.json())
router.use(passport.initialize());
router.use(passport.session())
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

exports.isLocalAuthenticated = function (req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function(err) {
          if (err) { return next(err); }
          return res.send('Successfully authenticated User');
        });
      })(req, res, next);
    };



        

router.get('/login', (req, res) => {
    res.render('login')
});

// router.get('/register', (req, res) => {
//     res.render('register')
// });

// router.post('/register', (req, res) => {
//     res.send('register post route')
// })
router.post('/register', async (req, res) => {
    
    let{name, email, userName, password} = req.body
        const newUser = await Users.findAll({
            where: {
                name: name,
                email: email,
                // userName: userName
            },
        });
        if (!newUser) {
            res.send(`${userName} already exists. please try again`)
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const createUser = await Users.create({
                name: name,
                email: email,
                userName: userName,
                password: hashedPassword
            });
            res.redirect(`/users/login`);
            
        };
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

