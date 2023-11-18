# 🚀 Setting up Node.js with MySQL in Docker Containers

This guide provides step-by-step instructions for configuring a Node.js application with MySQL in Docker containers.

## 📋 Overview

1. **Node.js Project Setup:**
   - Create a new directory for your project and navigate into it.
   - Initialize your Node.js project: `npm init -y`.
   - Install dependencies: `npm install express mysql2`.
   - Create an `index.js` file for your Express application.

2. **Docker Compose Configuration:**
   - Create a `Dockerfile` in the project root. 🐳
     ```Dockerfile
     FROM node:14

     WORKDIR /usr/src/app

     COPY package*.json ./

     RUN npm install

     COPY . .

     EXPOSE 3000

     CMD ["npm", "start"]
     ```
   - Create a `.dockerignore` file to exclude unnecessary files. 🚮
     ```plaintext
     node_modules
     npm-debug.log
     ```
   - Create a `docker-compose.yml` file in the project root. 🛠️
     ```yaml
     version: '3.8'

     services:
       mysqldb:
         image: mysql:latest
         env_file:
           - .env
         environment:
           MYSQL_ROOT_PASSWORD: ${MYSQLDB_PASSWORD}
           MYSQL_DATABASE: ${MYSQLDB_DATABASE}
         ports:
           - "${MYSQLDB_LOCAL_PORT}:${MYSQLDB_DOCKER_PORT}"

       app:
         build: .
         depends_on:
           - mysqldb
         ports:
           - "${NODE_LOCAL_PORT}:${NODE_DOCKER_PORT}"
     ```

3. **Environment Variables:**
   - Create a `.env` file. ⚙️
     ```plaintext
     MYSQLDB_PASSWORD=your_password
     MYSQLDB_DATABASE=your_database

     MYSQLDB_LOCAL_PORT=3307
     MYSQLDB_DOCKER_PORT=3306

     NODE_LOCAL_PORT=4000
     NODE_DOCKER_PORT=3000
     ```

4. **Build and Run:**
   - Build the Docker containers: `docker-compose build`. 🛠️
   - Run the Docker containers: `docker-compose up`.

Your Node.js application will be accessible at http://localhost:4000, and the MySQL database will be accessible at http://localhost:3307. 🌐


## 🛠️ Technologies Used

- ![Node.js](https://img.shields.io/badge/Node.js-%23339933.svg?style=flat&logo=node.js&logoColor=white)
- ![Express](https://img.shields.io/badge/Express-%23000000.svg?style=flat&logo=express&logoColor=%23ffffff)
- ![MySQL](https://img.shields.io/badge/MySQL-%23000000.svg?style=flat&logo=mysql&logoColor=%234479A1)
- ![Docker](https://img.shields.io/badge/Docker-%232496ED.svg?style=flat&logo=docker&logoColor=white)
- ![Docker Compose](https://img.shields.io/badge/Docker%20Compose-%23000000.svg?style=flat&logo=docker&logoColor=%232496ED)



## 🌐 Socials:
[![Instagram](https://img.shields.io/badge/Instagram-%23E4405F.svg?logo=Instagram&logoColor=white)](https://instagram.com/ivansanguezax) [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://linkedin.com/in/ivansanguezax) [![Twitter](https://img.shields.io/badge/Twitter-%231DA1F2.svg?logo=Twitter&logoColor=white)](https://twitter.com/ivansanguezax) 

---
⌨️ with ❤️ by [ivansanguezax](https://github.com/ivansanguezax) 😊