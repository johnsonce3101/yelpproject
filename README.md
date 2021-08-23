# yelpproject

## Running Migrations

### Production

Database is running on Heroku, if you have a migration, you need to run it by hand prior to code deployment.

Create a `.env` file at the root of the project that looks like 
```
DB_HOST=<get from heroku>
DB_NAME=<get from heroku>
DB_PASS=<get from heroku>
DB_USER=<get from heroku>
```

Finally, run the production migration!
```
env NODE_ENV=production npx sequelize-cli db:migrate
env NODE_ENV=production npx sequelize-cli db:seed:all
```

### Local

Running migrations locally are easier:
```
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

changed users to lower case in passportconfig