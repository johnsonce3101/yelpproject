CREATE DATABASE yelpdb;
\c yelpdb;

CREATE TABLE restaurants (
    id SERIAL PRIMARY KEY,
    name TEXT,
    location VARCHAR(50),
    stars INTEGER
);

INSERT INTO restaurants 
    (name,location,stars)
VALUES
    ('Subway', '11936 Bellaire Blvd', 5)
;

-- This is how you display the tables within a db
\dt

SELECT * FROM restaurants
