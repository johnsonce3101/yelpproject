const db = require('../models');
const User = db.Users;
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

const NO_USER_FOUND = "NO USER FOUND.";

module.exports = (passport) => {
    passport.use(new LocalStrategy(
        function(username, password, done) {
          User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
              return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
          });
        }
      ));
    
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