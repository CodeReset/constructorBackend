import { Sequelize } from "sequelize";
import { db } from "../../../config/db.js";

export default new Sequelize(db.DB_NAME, db.DB_USER, db.DB_PASSWORD, {
  dialect: "postgres",
  host: db.DB_HOST,
  port: db.DB_PORT,
});
