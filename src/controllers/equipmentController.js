import { EquipmentDTO } from "../models/dtos/equipmentDTO.js";
import { EquipmentService } from "../services/equipmentService.js";

const equipmentService = new EquipmentService();

const EquipmentController = {
    getAllEquipment: async (req, res) => {
        try {
            const listEquipments = await equipmentService.getAllEquipment();
            const equipmentDTOs = listEquipments.map((equipment) => new EquipmentDTO(equipment));
            res.status(200).json(equipmentDTOs);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar equipamentos", error: error.message });
        }
    },

    createEquipment: async (req, res) => {
        try {
            const newEquipment = await equipmentService.createEquipment(req.body);
            res.status(201).json({
                message: "Equipamento criado com sucesso",
                element: new EquipmentDTO(newEquipment),
            });
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar equipamento", error: error.message });
        }
    },

    getEquipmentById: async (req, res) => {
        try {
            const equipmentById = await equipmentService.getEquipmentById(req.params.id);
            if (!equipmentById) {
                return res.status(404).json({ message: "Equipamento não encontrado" });
            }
            res.status(200).json(new EquipmentDTO(equipmentById));
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar equipamento", error: error.message });
        }
    },

    updateEquipment: async (req, res) => {
        try {
            const updatedEquipment = await equipmentService.updateEquipment(req.params.id, req.body, {
                new: true,
            });
            if (!updatedEquipment) {
                return res.status(404).json({ message: "Equipamento não encontrado" });
            }
            res.status(200).json({
                message: "Equipamento atualizado com sucesso",
                element: new EquipmentDTO(updatedEquipment),
            });
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar equipamento", error: error.message });
        }
    },

    deleteEquipment: async (req, res) => {
        try {
            const deletedEquipment = await equipmentService.deleteEquipment(req.params.id);
            if (!deletedEquipment) {
                return res.status(404).json({ message: "Equipamento não encontrado" });
            }
            res.status(200).json({ message: "Equipamento deletado com sucesso" });
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar equipamento", error: error.message });
        }
    }
};

export default EquipmentController;
