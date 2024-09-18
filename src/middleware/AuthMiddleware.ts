import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export class authMiddleware {
  public static async verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      res.status(401).json({ message: "Access denied" });
      return;
    }

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { id: number; role: string };
      req.body.user = decoded;
      next();
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Invalid token" });
      return;
    }
  }
}
