Drop Database Training;
-- Step 1: Create Database
CREATE DATABASE IF NOT EXISTS Training;

-- Step 2: Use the Database
USE Training;

-- Step 3: Create Users Table
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    userName VARCHAR(50) NOT NULL ,
    password VARCHAR(255) NOT NULL,
    phoneNumber VARCHAR(15) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);