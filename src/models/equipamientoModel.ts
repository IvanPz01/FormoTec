import { db } from "../config/db";

export class Equipamiento {
    public id: number;
    public name: string;
    public description: string;
    public status: string;
    public location: string;
    public acquisitionDate: string;

    constructor(id: number, name: string, description: string, status: string, location: string, acquisitionDate: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.status = status;
        this.location = location;
        this.acquisitionDate = acquisitionDate;
    }
    static async createEquipamiento(name: string, description: string, status: string, location: string, acquisitionDate: string) {
        await db.query('INSERT INTO equipamiento (name, description, status, location, acquisition_date) VALUES ($1, $2, $3, $4, $5)', [name, description, status, location, acquisitionDate]);
    }
    static async getAllEquipamiento(): Promise<Equipamiento[]> {
        const result = await db.query('SELECT * FROM equipamiento');
        return result.rows.map((equipamiento: any) => new Equipamiento(equipamiento.id, equipamiento.name, equipamiento.description, equipamiento.status, equipamiento.location, equipamiento.acquisition_date));
    }
    static async getEquipamientoById(id: number): Promise<Equipamiento | null> {
        const result = await db.query('SELECT * FROM equipamiento WHERE id = $1', [id]);
        if (result.rows.length > 0) {
            const equipamiento = result.rows[0];
            return new Equipamiento(equipamiento.id, equipamiento.name, equipamiento.description, equipamiento.status, equipamiento.location, equipamiento.acquisition_date);
        }
        return null;
    }
    static async updateEquipamiento(id: number, name: string, description: string, status: string, location: string, acquisitionDate: string) {
        await db.query('UPDATE equipamiento SET name = $1, description = $2, status = $3, location = $4, acquisition_date = $5 WHERE id = $6', [name, description, status, location, acquisitionDate, id]);
    }
    static async deleteEquipamiento(id: number) {
        await db.query('DELETE FROM equipamiento WHERE id = $1', [id]);
    }
}