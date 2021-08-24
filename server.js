//express setup, for REST API
const express = require('express');
const app = express();
const session = require('express-session')
const path = require('path');
const PORT = process.env.PORT || 8002; 
const bodyParser = require('body-parser');
const passport = require('passport');
const rootController = require('./routes/index');
const es6Renderer = require('express-es6-template-engine');
const Sequelize = require('sequelize');
const postgres = require('./config/config');
require('./config/passportConfig')(passport);
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //extended true, any type
//express setup for static css and js
app.use(express.static('public'));

app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(passport.initialize());
// app.use(passport.session());

// require('./config/passportConfig')(passport);

// require('dotenv').config();
// async function testdb() {try {
//     console.log('test db');
//     await Sequelize.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
//   }
//  testdb();

app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html'); 

//Controller to render the index route
app.use('/',rootController);

// Controller to render the users route
const userController = require('./routes/users')(passport)
app.use('/users', userController);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});