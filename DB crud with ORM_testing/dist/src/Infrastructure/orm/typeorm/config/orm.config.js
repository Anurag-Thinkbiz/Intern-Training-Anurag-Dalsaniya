"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
require("dotenv/config");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: process.env.HOST,
    username: process.env.USER,
    password: process.env.password,
    database: process.env.DATABASE,
    synchronize: true,
    logging: true,
    entities: ['src/Infrastructure/orm/typeorm/entities/*.ts']
});
