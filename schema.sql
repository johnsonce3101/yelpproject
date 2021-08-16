--table schema for db
--table for Restaurants
CREATE TABLE Restaurants (
    id serial primary key,
    Restaurant_name text,
    Address varchar,
    stars integer(5), 
    comment text,
    takout boolean,
    last_visit timestamp
);

--table for Users
CREATE TABLE Users (
    id serial primary key,
    name text,
    email varchar(30),
    user_Name text,
);

--table for User reviews
CREATE TABLE reviews(
    id serial primary key,
    comment text,
    stars integer(5)
    User_id integer,
    restaurant_id integer,
    FOREIGN KEY (User_id) REFERENCES User (id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurant (id)
);

--table for reviewers? maybe redundant 

