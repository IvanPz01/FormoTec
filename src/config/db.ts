import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

class DataBase {
    private pool: Pool;

    constructor(){
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_DATABASE,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT || "5432")
        });
    }
    public getPool(){
        return this.pool;
    }
}

export const db = new DataBase().getPool();