# Stage 1: Build the application
FROM node:16-alpine AS build_audit

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Stage 2: Run the application
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build_audit /app .

# Expose the port defined in the .env file
# Default to 3000 if not provided
ARG PORT=3001
ENV PORT=${PORT}
EXPOSE ${PORT}

# Start the application
CMD ["node", "server.js"]