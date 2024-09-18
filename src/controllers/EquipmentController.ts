import { Request,Response } from "express";
import { Equipamiento } from "../models/equipamientoModel";

export class EquipamientoControllers{
    public static async getEquipamiento(req: Request, res: Response){
        try {
            const equipamiento = await Equipamiento.getAllEquipamiento();
            res.json(equipamiento);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    public static async getEquipamientoById(req: Request, res: Response){
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }
        try {
            const equipamiento = await Equipamiento.getEquipamientoById(id);
            if (!equipamiento) {
                return res.status(404).json({ message: "Equipamiento not found" });
            }
            res.json(equipamiento);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    public static async createEquipamiento(req: Request, res: Response){
        const { name, description, status, location, acquisitionDate } = req.body;
        if (!name || !description || !status || !location || !acquisitionDate) {
            return res.status(400).json({ message: "Missing fields" });
        }
        try {
            await Equipamiento.createEquipamiento(name, description, status, location, acquisitionDate);
            res.status(201).json({ message: "Equipamiento created" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    public static async updateEquipamiento(req: Request, res: Response){
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }
        const { name, description, status, location, acquisitionDate } = req.body;
        if (!name || !description || !status || !location || !acquisitionDate) {
            return res.status(400).json({ message: "Missing fields" });
        }
        try {
            await Equipamiento.updateEquipamiento(id, name, description, status, location, acquisitionDate);
            res.json({ message: "Equipamiento updated" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    public static async deleteEquipamiento(req: Request, res: Response){
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }
        try {
            await Equipamiento.deleteEquipamiento(id);
            res.json({ message: "Equipamiento deleted" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}