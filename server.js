//express setup, for REST API

const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8002; 
const bodyParser = require('body-parser');
const passport = require('passport');
const bcrypt = require('bcrypt');
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //extended true, any type
//express setup for static css and js
app.use(express.static('public'));
//app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

require('dotenv').config();

const Sequelize = require('sequelize');
  

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html'); 

//Controller to render the index route
const rootController = require('./routes/index');
app.use('/',rootController);

// Controller to render the users route
const userController = require('./routes/users')
app.use('/users', userController);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});