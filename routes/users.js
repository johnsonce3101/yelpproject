const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const db = require('../models');
const Users = require('../models/users')
const bcrypt = require('bcrypt');
const ensureAuthenticated = require('../routes/ensureAuthenticated');
const postgres = require('../config/config')

module.exports = (passport) => {
    router.post('/login', 
        (req, res, next) => {
            const {userName} = req.body;
            console.log("username: ", userName)
            passport.authenticate(
                'local-strategy', function(err, user, info) {
                    console.log("inside USER AUTHENTICATE")
                    if (err) {
                        return res.status(401).json(err)
                    }
                    if (user) {
                        return res.status(200).json(user)
                    } else {
                        res.status(401).json(info);
                    }
                }
            )(req, res, next)
        }
    );


    // passport.use(new LocalStrategy(
    //     function(username, password, done) {
    //       User.findOne({ username: username }, function (err, user) {
    //         if (err) { return done(err); }
    //         if (!user) { return done(null, false); }
    //         if (!user.verifyPassword(password)) { return done(null, false); }
    //         return done(null, user);
    //       });
    //     }
    //   ));


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

    router.get('/register', (req, res) => {
        res.render('register')
    });

    // router.post('/register', (req, res) => {
    //     res.send('register post route')
    // })
    router.post('/register', async (req, res) => {
        
        let{name, email, userName, password} = req.body
            const newUser = await db.users.findAll({
                where: {
                    name: name,
                    email: email,
                    // userName: userName
                }, 
            });

        console.log(name);

            if (!newUser) {
                res.send(`${userName} already exists. please try again`)
            }
            else {
                const hashedPassword = await bcrypt.hash(password, 10);

                const createUser = await db.users.create({
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

    return router
}
