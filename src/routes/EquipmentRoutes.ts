import { EquipamientoControllers } from "../controllers/EquipmentController";
import { Router } from "express";
import { authMiddleware } from "../middleware/AuthMiddleware";

const router = Router();

router.get("/", authMiddleware.verifyToken, EquipamientoControllers.getEquipamiento);
router.get("/:id", authMiddleware.verifyToken, EquipamientoControllers.getEquipamientoById);
router.post("/", authMiddleware.verifyToken, EquipamientoControllers.createEquipamiento);
router.put("/:id", authMiddleware.verifyToken, EquipamientoControllers.updateEquipamiento);
router.delete("/:id", authMiddleware.verifyToken, EquipamientoControllers.deleteEquipamiento);

export default router;