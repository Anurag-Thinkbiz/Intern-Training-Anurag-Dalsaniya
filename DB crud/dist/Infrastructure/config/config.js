"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
require("dotenv/config");
exports.default = mysql2_1.default
    .createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.password,
    database: process.env.DATABSE,
})
    .promise();
