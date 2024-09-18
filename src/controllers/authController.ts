import { Request, Response } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthController {

  public static async register(req: Request, res: Response): Promise<void> {
    let { name, password, role } = req.body;

    if (!role) {
        role = "empleado";
    }
    
    if (!name || !password) {
      res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    try {
        const existingUser = await User.getUserByName(name);
        if (existingUser) {
            res.status(409).json({ message: "El usuario ya existe" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.createUser(name, hashedPassword, role);

        res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (err) {
        console.error("Error en el registro:", err);
        res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  public static async login(req: Request, res: Response): Promise<void> {
    const { name, password } = req.body;

    if (!name || !password) {
      res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    try {
      const user = await User.getUserByName(name);
      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }
      
      console.log("Contraseña proporcionada:", password);
      console.log("Hash almacenado:", user.password);

      const isPasswordValid = await bcrypt.compare(password, user.password);
      console.log("¿Contraseña válida?:", isPasswordValid);

      if (!isPasswordValid) {
        res.status(401).json({ message: "Contraseña incorrecta" });
        return;
      }
      
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.SECRET_KEY!,
        { expiresIn: '1h' }
      );

      res.json({ token });
    } catch (err) {
      console.error("Error en el inicio de sesión:", err);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
