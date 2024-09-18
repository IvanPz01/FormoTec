import { Request, Response } from "express";
import { Equipamiento } from "../models/equipamientoModel";
import { User } from "../models/userModel";
import jwt from "jsonwebtoken";

export class EquipamientoControllers {
  public static async getEquipamiento(req: Request, res: Response): Promise<void> {
    try {
      const equipamiento = await Equipamiento.getAllEquipamiento();
      res.json(equipamiento);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }

  public static async getEquipamientoById(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid id" });
      return;
    }
    try {
      const equipamiento = await Equipamiento.getEquipamientoById(id);
      if (!equipamiento) {
        res.status(404).json({ message: "Equipamiento not found" });
        return;
      }
      res.json(equipamiento);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }

  public static async createEquipamiento(req: Request, res: Response): Promise<void> {
    const { name, description, status, location, acquisitionDate } = req.body;
    if (!name || !description || !status || !location || !acquisitionDate) {
      res.status(400).json({ message: "Missing fields" });
      return;
    }
  
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      res.status(401).json({ message: "Access denied" });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { id: number; role: string };
      if (decoded.role !== 'Admin') { 
        res.status(403).json({ message: "Forbidden" });
        return;
      }
  
      await Equipamiento.createEquipamiento(name, description, status, location, acquisitionDate);
      res.status(201).json({ message: "Equipamiento created" });
    } catch (err) {
      console.error('Error in createEquipamiento:', err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }
  

  public static async updateEquipamiento(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid id" });
      return;
    }
    const { name, description, status, location, acquisitionDate } = req.body;
    if (!name || !description || !status || !location || !acquisitionDate) {
      res.status(400).json({ message: "Missing fields" });
      return;
    }
    try {
      await Equipamiento.updateEquipamiento(id, name, description, status, location, acquisitionDate);
      res.json({ message: "Equipamiento updated" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }

  public static async deleteEquipamiento(req: Request, res: Response): Promise<void> {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "Invalid id" });
      return;
    }

    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      res.status(401).json({ message: "Access denied" });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { id: number; role: string };
      if (decoded.role !== 'admin') {
        res.status(403).json({ message: "Forbidden" });
        return;
      }

      await Equipamiento.deleteEquipamiento(id);
      res.json({ message: "Equipamiento deleted" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
  }
}
