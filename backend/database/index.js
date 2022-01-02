const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    host: "localhost",
    port: process.env.DB_PORT,
    logging: false,
  }
);

module.exports = sequelize;
