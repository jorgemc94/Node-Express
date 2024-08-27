import mysql from "mysql2/promise";
import "dotenv/config";

export const connection = mysql.createPool({
    host: process.env.HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.DATABASE
})
    