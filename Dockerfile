# Base image
FROM node:18

# Create a working directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
