//express setup, for REST API
const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 8002; 

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //extended true, any type
//express setup for static css and js
app.use(express.static('public'));

//cors setup for api running on different domain (if 2 deployments)
const cors = require ("cors");
var corsOptions = {
    origin: "http://localhost:8081" //CHANGE FROM LOCAL
};

app.use(cors(corsOptions));

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