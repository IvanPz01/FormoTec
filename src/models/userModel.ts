import { db } from "../config/db";
import bcrypt from 'bcryptjs';

export class User {
    id: number;
    name: string;
    password: string;
    role: string;

    constructor(id: number, name: string, password: string, role: string) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.role = role;
    }

    static async createUser(name: string, hash: string, role: string) {
        console.log('Creating user');
        await db.query('INSERT INTO users (name, password, role) VALUES ($1, $2, $3)', [name, hash, role]);
    }
    static async getUserByName(name: string): Promise<User | null> {
        const result = await db.query('SELECT * FROM users WHERE name = $1', [name]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            return new User(user.id, user.name, user.password, user.role);
        }
        return null;
    }

}