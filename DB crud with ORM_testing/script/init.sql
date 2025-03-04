-- Create the database
CREATE DATABASE IF NOT EXISTS my_database;

-- Switch to the newly created database
USE my_database;

-- Create the table
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) NOT NULL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
  address VARCHAR(255) DEFAULT NULL,
  createdAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  updatedAt DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)
);

-- Insert a default user
INSERT INTO users (id, name, email, password, role, address) 
VALUES ('123e4567-e89b-12d3-a456-426614174000', 'John Doe', 'john.doe@example.com', 'hashedpassword', 'user', '123 Main St');
