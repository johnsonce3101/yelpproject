const db = require('../models');
const User = db.Users;
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local');

const NO_USER_FOUND = "NO USER FOUND.";
const passport = require('passport');
module.exports = () => {
    passport.use(new LocalStrategy(
        async function (userName, password, done) {
            const user = await User.findOne({
                where: {
                    name: name,
                    email: email,
                    userName: userName
                }
            }).catch(error => {return dont(error)});
            if (!user) {
                return done(null, false, {message: NO_USER_FOUND});
            }
            let matched = await bcrypt.compare(password, user.password);
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
            let user = await User.findOne({
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