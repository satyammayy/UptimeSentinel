

# Use the official Node.js image as the base image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app


# Install tmux and any required dependencies
RUN apt-get update && apt-get install -y tmux

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Ensure the start.sh script is executable
RUN chmod +x start.sh

# Expose the application port
EXPOSE 3000

# Set the entry point to execute start.sh
ENTRYPOINT ["./start.sh"]
