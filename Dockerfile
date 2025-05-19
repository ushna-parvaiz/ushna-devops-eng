# Use Node.js base image
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the backend code
COPY backend/ .

# Expose backend port
EXPOSE 5000

# Start the backend
CMD ["node", "server.js"]
