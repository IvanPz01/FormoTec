import { Request,Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


export class authMiddleware {
    public static async verifyToken(req: Request, res: Response, next: NextFunction) {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: "Access denied" });
        }
        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY!);
            req.body.user = decoded;
            next();
        } catch (err) {
            console.error(err);
            return res.status(400).json({ message: "Invalid token" });
        }
    }
}