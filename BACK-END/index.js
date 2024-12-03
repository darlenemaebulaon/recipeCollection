const express = require("express");
const dotenv = require("dotenv");
const mysql = require("mysql2");
const cors = require("cors");
const recipeRoutes = require("./route/recipeRoutes.js");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use("/recipes", recipeRoutes);

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend's origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
}));

const port = process.env.PORT || 3000;
console.log("Port being used:", port);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});