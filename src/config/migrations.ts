import { db } from "./db";

async function createTables() {
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role VARCHAR(50) NOT NULL
        );
    `;

    const createEquipamientoTable = `
        CREATE TABLE IF NOT EXISTS equipamiento (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            description TEXT,
            status VARCHAR(50),
            location VARCHAR(255),
            acquisition_date DATE
        );
    `;

    try {
        await db.query(createUsersTable);
        await db.query(createEquipamientoTable);
        console.log("Tablas creadas o ya existentes.");
    } catch (err) {
        console.error("Error creando tablas:", err);
    }
}

export { createTables };
