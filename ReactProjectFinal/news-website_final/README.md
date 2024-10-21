Project Documentation for News Website

Introduction

This project is a news aggregator website built using  React .The primary goal of the website is to pull articles from multiple news APIs and present them in a clean, user-friendly format. The key features of the website include a search option, a highlights marquee, integration with three different APIs for retrieving news articles, and additional functionalities such as a "read more" feature for each news article and direct access to share news via social media platforms.

Features:

 1. Search Functionality
   - Users can search for specific news articles by entering keywords into the search bar. This functionality filters the news displayed based on the user's search query, allowing for easy navigation and retrieval of relevant articles.

2. Highlights Marquee
   - The website includes a marquee that scrolls through the top highlights from the selected APIs. This provides users with quick access to the latest and most popular news headlines in a visually appealing manner.

 3. API Integration
   - The website pulls articles from three different APIs, ensuring a diverse and rich selection of news content. These APIs provide real-time news updates from various sources, ensuring users have access to the latest news on a wide range of topics.
4. Read More Functionality
   - Each news article has a "Read More" button that links to the full article. This feature allows users to dive deeper into news stories they find interesting.

 5. Social Media Access
   - Users can quickly share articles via social media platforms like Twitter and Facebook using integrated buttons. This makes it easy for users to engage with the news and share it with their networks.

---

Docker Implementation

What is Docker?

Docker is a platform that allows developers to automate the deployment of applications inside lightweight, portable containers. Containers include everything the software needs to run (code, runtime, libraries, etc.), ensuring consistency across different environments (development, testing, production).

Why Docker for This Project?

By containerizing the news website using Docker, the application can be run in any environment without compatibility issues. This ensures that the website can be easily shared, tested, and deployed across various platforms without worrying about environment-specific problems such as missing dependencies or software versions.

Dockerfile and Explanation

Below is the Dockerfile that was created to containerize the React application:
Dockerfile

#Use the official Node.js image based on Alpine for a smaller image size
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the app in development mode
CMD ["npm", "run", "dev"]

 Dockerfile Breakdown:

-Base Image: We're using `node:20-alpine` as the base image. This is a lightweight image that contains Node.js and npm, which are required to build and run the React application.
  
- WORKDIR: The `WORKDIR /app` command sets the working directory inside the Docker container. All subsequent commands will be executed inside this directory.

- COPY package.json: We copy the `package.json` and `package-lock.json` files into the container, which are needed to install dependencies.

- RUN npm install: This command installs all the dependencies defined in `package.json`.

- COPY . .: After installing the dependencies, the rest of the application’s code is copied into the container.

- RUN npm run build: This command builds the React application, preparing it for production.

- EXPOSE 3000: The application will run on port 3000 inside the container, which is exposed to allow access to the application from outside the container.

- CMD ["npm", "run", "dev"]: This sets the command that will be run when the container starts. It runs the React app in development mode using `npm run dev`.

---

 Steps to Build and Run the Docker Container

To containerize and run the React news website using Docker, follow these steps:

 1. Create the Docker Image
Ensure you're in the project directory that contains the `Dockerfile` and run the following command to build the Docker image:
docker build -t react-app .

This command tells Docker to build an image named `react-app` based on the instructions in the Dockerfile.

2. Run the Docker Container
Once the image has been built successfully, run the container using:

docker run -p 3000:3000 react-app


This command maps port `3000` of the Docker container to port `3000` on your local machine, allowing you to access the application via `http://localhost:3000`.

 3. Verify the Application
Once the container is running, open a web browser and go to `http://localhost:3000` to see your news website in action.

Conclusion

By using Docker, the news website has been successfully containerized, ensuring that the application can be easily shared, tested, and deployed across different environments. The website itself provides a robust user experience, featuring a powerful search option, highlight marquee, integration with multiple news APIs, and user-friendly features like the "Read More" option and social media sharing.

This setup allows for flexible scaling and deployment, making it easy to extend or modify the application in the future.
