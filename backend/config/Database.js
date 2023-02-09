import { Sequelize } from "sequelize";

const db = new Sequelize("nr_cms", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
