# Stage 1: Build the React app
FROM node:20.16 AS build

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files into the container
COPY . .

# Build the app (this generates the dist/ folder by default)
RUN npm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# Remove default Nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output from the previous stage into Nginx's serving directory
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration to handle React Router
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 to the host
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
