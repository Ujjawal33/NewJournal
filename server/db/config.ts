import { Dialect, Sequelize } from "sequelize";

const dbHost = process.env.RDS_HOSTNAME;
const dbPort = process.env.RDS_PORT;
const dbName = process.env.RDS_DB_NAME as string;
const dbUser = process.env.RDS_USERNAME as string;

const dbDriver = process.env.DB_DRIVER as Dialect;
const dbPassword = process.env.RDS_PASSWORD;

function getConnection() {
  console.log("connection to DB.......");
  return new Sequelize("journal", "root", "root", {
    host: "localhost",
    port: parseInt(dbPort || "3306"),
    dialect: "mysql",
    dialectOptions: {
      options: {
        requestTimeout: 4000,
      },
    },
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
    },
  });
}

const sequelizeConnection = getConnection();

export default sequelizeConnection;
