const db = require('../models');
const users = db.users;
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

const NO_USER_FOUND = "NO USER FOUND.";
module.exports = (passport) => {
    passport.use('local-strategy', new LocalStrategy(
        {
            usernameField: 'userName',
            passwordField: 'password'
        },
        function (userName, password, done) {
            console.log("hey")
            const user = users.findOne({
                where: {
                    name: name,
                    email: email,
                    userName: userName
                }
            }).catch(error => {return dont(error)});
            if (!user) {
                return done(null, false, {message: NO_USER_FOUND});
            }
            let matched = bcrypt.compare(password, user.password);
            if (!matched) {
                return done(null, false, { message: NO_USER_FOUND});
            }
            return done(null, user); //FIX
        }
    ))
    passport.serializeUser((user, done) => {
        done(null, user.name);
    });
    passport.deserializeUser(async (name, done) => {
        try {
            let user = await users.findOne({
                where: {
                    name: name,
                    email: email,
                    userName: userName
                }
            });
            if (!user) {
                return done(new Error('user not found'))
            };
            done(null, user);
        }catch (error) {
            done(error)
        };
    });
};