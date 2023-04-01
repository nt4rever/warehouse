import * as dotenv from "dotenv";
dotenv.config();

import sql from "mssql";
import assert from "assert";

const { DB_USER, DB_PWD, DB_NAME, DB_URL, DB_INSTANCE, DB_PORT } = process.env;
assert(DB_USER, "DB_USER configuration is required.");
assert(DB_PWD, "DB_PWD configuration is required.");
assert(DB_NAME, "DB_NAME configuration is required.");
assert(DB_URL, "DB_URL configuration is required.");
assert(DB_PORT, "DB_URL configuration is required.");
assert(DB_INSTANCE, "DB_INSTANCE configuration is required.");

const sqlConfig = {
  server: DB_URL,
  user: DB_USER,
  password: DB_PWD,
  database: DB_NAME,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    instancename: DB_INSTANCE,
    enableArithAbort: true,
    trustConnection: false,
    trustServerCertificate: true,
  },
  port: Number(DB_PORT),
};

sql.on("error", (err) => {
  console.log(err.message);
});

const poolPromise = new sql.ConnectionPool(sqlConfig)
  .connect()
  .then((pool) => {
    console.log("Connected to MSSQL");
    return pool;
  })
  .catch((err) => console.log("Database Connection Failed! Bad Config: ", err));

export default poolPromise;
