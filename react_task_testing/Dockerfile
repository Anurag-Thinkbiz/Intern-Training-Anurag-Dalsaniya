# Use an official Node.js runtime as a parent image
FROM node:22-alpine AS build
 
# Set the working directory in the container
WORKDIR /app
 
# Copy package.json and package-lock.json first to leverage Docker caching
COPY package.json package-lock.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of the application code
COPY . .
 
# Build the Vite app
RUN npm run build
 
# Use a lightweight web server for serving the built app
FROM nginx:alpine AS production
 
# Set working directory in Nginx
WORKDIR /usr/share/nginx/html
 
# Remove default Nginx static assets
RUN rm -rf ./*
 
# Copy build artifacts from the previous stage
COPY --from=build /app/dist .
 
# Expose port 80
EXPOSE 80
 
# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
 