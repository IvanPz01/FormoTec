import e, { Response, Request } from "express";
import { User } from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthController {
    public static async register(req: Request, res: Response) {
        const { name, password, role } = req.body;
        if (!name || !password || !role) {
            return res.status(400).json({ message: "Missing fields" });
        }
        try {
            await User.createUser(name, password, role);
            res.status(201).json({ message: "User created" });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
    public static async login(req: Request, res: Response) {
        const { name, password } = req.body;
        if (!name || !password) {
            return res.status(400).json({ message: "Missing fields" });
        }
        try {
            const user = await User.getUserByName(name);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const validate = await bcrypt.compare(password, user.password);
            if (!validate) {
                return res.status(401).json({ message: "Invalid password" });
            }
            const token = jwt.sign({ id: user.id, role: user.role }, process.env.SECRET_KEY!, { expiresIn: '1h' });
            return res.json({ token });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}