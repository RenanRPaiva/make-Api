import { Sequelize } from "sequelize";
const mongoose = require("mongoose");
require("dotenv").config();

const sequelize = new Sequelize(
  `mysql://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.MYSQL_DB}`,
  {
    dialect: "mysql",
  }
);

mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.MG_PORT}/${process.env.MONGO_DB}`)

const mongooseDb = mongoose.connection;

export {
  sequelize,
  mongooseDb
};
