import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  username: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.NAME,
  port: Number(process.env.PORT), 
  synchronize: true,
  logging: true,
  entities: ["src/Infrastructure/orm/typeorm/entities/*.ts"],
});
