#!/bin/bash

# Variables
IMAGE_NAME="mysql-custom-image"
CONTAINER_NAME="mysql-container"
MYSQL_ROOT_PASSWORD="NewPassword123!"
DB_PORT=3306

# Create init.sql file
cat <<EOL > init.sql
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
EOL

# Create Dockerfile
cat <<EOL > Dockerfile
FROM mysql:8.0
ENV MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD
COPY ./init.sql /docker-entrypoint-initdb.d/
EXPOSE $DB_PORT
EOL

# Build the Docker image
docker build -t $IMAGE_NAME .

# Run the Docker container
docker run --name $CONTAINER_NAME -d -p $DB_PORT:3306 $IMAGE_NAME

# Wait for MySQL to initialize
echo "Waiting for MySQL to start..."
sleep 10

# Execute SQL script inside the running container
docker exec -i $CONTAINER_NAME mysql -u root -p$MYSQL_ROOT_PASSWORD < init.sql

echo "MySQL container is up and running, and the database has been initialized."
