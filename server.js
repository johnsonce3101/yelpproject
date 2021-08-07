console.log("App running")

//express setup, for REST API
const express = require('express');
const app = express();
const path = require('path');
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


db.sequelize.sync({ force: true }).then (() => { //drop and resync
    console.log("Drop and re-sync db.")});

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const PORT = process.env.PORT || 8080; //changed default port to 8080

//express setup for static css and js
app.use(express.static('public'));

//simple test route
app.get('/', (req, res) => {
    res.send('Hello World')
});
// Route to render login page
app.get('/login', (req, res) => {
    res.render('../app/views/login')
});
// Route to render register page
app.get('/register', (req, res) => {
    res.render('../app/views/register')
});
// Route to render dashboard
app.get('/dashboard', (req, res) => {
    res.render('../app/views/dashboard', {user: 'Jonathan'})
});
//parse requrest of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded, express mw for parsing bodies from URL
app.use(express.urlencoded({ extended: true }));

//basic routes

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`)
});;