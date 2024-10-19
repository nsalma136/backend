# Use the official Node.js image
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code, including index.js
COPY . .

# Expose port 3000 (or any other port your app uses)
EXPOSE 5000

# Set the default command to run your Node app
CMD ["node", "index.js"]
