-- Create database by running
-- sqlite3 my_database

-- Add table to database by running
-- sqlite3 my_database.sqlite < users.sql

-- Create new table
CREATE TABLE users (
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER NOT NULL
);

-- example of direct input
INSERT INTO users (name, age)
VALUES ('Man', 50), ('Lady', 30);
