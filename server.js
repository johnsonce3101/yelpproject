
//express setup, for REST API
const express = require('express');
const app = express();
const path = require('path');
const pgp = require('pg-promise')();

app.use(express.json());
app.use(express.urlencoded({ extended: true})); //extended true, any type
//express setup for static css and js
app.use(express.static('public'));

//cors setup for api running on different domain (if 2 deployments)
const cors = require ("cors");
var corsOptions = {
    origin: " http://localhost:8081" //CHANGE FROM LOCAL
};

app.use(cors(corsOptions));

const Sequelize = require('sequelize');

// db.sequelize.sync({ force: true }).then (() => { //drop and resync
//     console.log("Drop and re-sync db.")});


db.sequelize.sync({ force: true }).then (() => { //drop and resync
    console.log("Drop and re-sync db.")});

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

const PORT = process.env.PORT || 8000; //changed default port to 8080

// connecting database
const db = pgp("postgres://localhost:5432/yelpdb")

let restaurants = db.any("SELECT * FROM restaurants").then( (restaurant) => {
    console.log(restaurant)
})

app.get('/', (req, res) => {
    res.json({success: 'true'})
})

//Controller to render the index route
const rootController = require('./routes/index');

app.use('/',rootController);

// Controller to render the users route
const userController = require('./routes/users')

app.use('/users', userController);

//parse requrest of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded, express mw for parsing bodies from URL
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
});