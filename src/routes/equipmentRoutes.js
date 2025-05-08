import express from "express";
import EquipmentController from "../controllers/equipmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.get("/equipment", EquipmentController.getAllEquipment);
routes.post("/equipment", authMiddleware, EquipmentController.createEquipment);
routes.put("/equipment/:id", authMiddleware, EquipmentController.updateEquipment);
routes.get("/equipment/:id", EquipmentController.getEquipmentById);
routes.delete("/equipment/:id", authMiddleware, EquipmentController.deleteEquipment);

export default routes;
