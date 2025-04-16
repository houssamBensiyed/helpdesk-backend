// src/config/database.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "helpdesk_db", // This is the database name
  process.env.DB_USER || "root", // Database username
  process.env.DB_PASS || "", // Database password
  {
    host: process.env.DB_HOST || "localhost", // This should be 'localhost' or your actual database host
    dialect: "mysql",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;
