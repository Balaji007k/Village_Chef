-- Village Chef Database Schema
CREATE DATABASE IF NOT EXISTS village_chef;
USE village_chef;

-- Drop tables if they exist to allow clean re-runs
DROP TABLE IF EXISTS contacts;
DROP TABLE IF EXISTS foods;
DROP TABLE IF EXISTS users;

-- Create Foods Table
CREATE TABLE foods (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(255),
    category VARCHAR(50) NOT NULL,
    rating DOUBLE DEFAULT 5.0,
    ingredients VARCHAR(255),
    available BOOLEAN DEFAULT TRUE,
    is_veg BOOLEAN DEFAULT TRUE
);

-- Create Contacts Table
CREATE TABLE contacts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Users Table
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
