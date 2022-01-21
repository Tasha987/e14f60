const Sequelize = require("sequelize");
require("dotenv").config()

const db = new Sequelize(process.env.DATABASE_URL || `postgres://${process.env.USERNAME}:${process.env.PASSWORD}@localhost:5432/messenger`, {
  logging: false,
  dialect: "postgres"
});

module.exports = db;
