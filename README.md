# Issue Tracker

## General Info
This project is a MERN (MongoDB, Express, React, Node) application with CRUD (Create, Read, Update, Delete) functions and lets users keep track of variety of issues with different priorities. It takes data saved in the server from MongoDB database and lets users login, add, edit issues.

## Setup

### Node Installation
Go to Official Node.js Website and download the installer per your operating system.

### Connect to MongoDB
Note: This repository only contains code for the client side of the project.

Create an `.env` file (outside your `src` folder) with similar text below, where your `<port number>` matches your server `<port number>`:
```
REACT_APP_API_URL=http://localhost:<port number>/api
```

### Run 
After node is installed, install the modules by running the following commands in the terminal to install package dependencies.
```
npm install
```

Dependencies that will be installed for the client-side:

- axios
- bootstrap
- react-bootstrap <!-- npm install react-bootstrap bootstrap -->
- react-router-dom

Run the project when is the server is connected:
```
npm start
```