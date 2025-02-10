import { DataSource } from "typeorm";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.HOST,
  username: process.env.USER,
  password: process.env.password,
  database: process.env.DATABASE,
  synchronize:false,
  logging:true,
  entities:['src/Infrastructure/orm/typeorm/entities/*.ts']
});