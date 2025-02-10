import mysql from "mysql2";
import "dotenv/config";

export default mysql
  .createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.password,
    database: process.env.DATABASE,
  })
  .promise();
