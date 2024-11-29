# Use the official Node.js image
FROM node:18

# Install tmux and any required dependencies
RUN apt-get update && apt-get install -y tmux

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app's code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the app using tmux
CMD ["./start.sh"]
