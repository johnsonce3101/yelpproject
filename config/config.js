//require('dotenv').config();

module.exports = {
  "production": {
    "username": "sunktzblwqxtzc",
    "password": "8722106cc8e04cee8898ccc205ec1144bec6110c39a77913ee6ff3e9e66926c2",
    "database": "d2e2ohdpssmk3",
    "host": "ec2-34-204-128-77.compute-1.amazonaws.com",
    "dialect": "postgres",
    "protocol": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false 
      }
    }
  },

  "test": {
    "username": "",
    "password": null,
    "database": "yelpdb",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },

  "production": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOST,
    "dialect": "postgres",
    "protocol": "postgres",
    "dialectOptions": {
      "ssl": {
        "require": true,
        "rejectUnauthorized": false 
      }
    }
  }
}