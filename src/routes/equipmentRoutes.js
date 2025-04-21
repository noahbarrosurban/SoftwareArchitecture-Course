import express from "express";
import EquipmentController from "../controllers/equipmentController.js";

const routes = express.Router();

routes.get("/equipment", EquipmentController.getAllEquipment);
routes.post("/equipment", EquipmentController.createEquipment);
routes.put("/equipment/:id", EquipmentController.updateEquipment);
routes.get("/equipment/:id", EquipmentController.getEquipmentById);
routes.delete("/equipment/:id", EquipmentController.deleteEquipment);

export default routes;
