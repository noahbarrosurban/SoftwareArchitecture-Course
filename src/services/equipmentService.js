import { EquipmentRepository } from "../repositories/equipmentRepository.js";
import { EquipmentDTO } from "../models/dtos/equipmentDTO.js";

export class EquipmentService {
    constructor() {
        this.EquipmentRepository = new EquipmentRepository();
    }

    createEquipment = async (EquipmentData) => {
        const Equipment = EquipmentDTO.fromRequest(EquipmentData);
        return await this.EquipmentRepository.create(Equipment);
    };

    getAllEquipment = async () => {
        return await this.EquipmentRepository.findAll();
    };

    getEquipmentById = async (id) => {
        const foundEquipment = await this.EquipmentRepository.findById(id);
        if (!foundEquipment) {
            throw new Error("Equipamento não encontrado!");
        }
        return foundEquipment;
    };

    updateEquipment = async (id, EquipmentData) => {
        if (!EquipmentData || Object.keys(EquipmentData).length === 0) {
            throw new Error("Nenhum dado fornecido para atualização!");
        }

        const updatedEquipment = await this.EquipmentRepository.update(id, EquipmentData);
        if (!updatedEquipment) {
            throw new Error("Equipamento não encontrado!");
        }
        return updatedEquipment;
    };

    deleteEquipment = async (id) => {
        const deleteEquipment = await this.EquipmentRepository.delete(id);
        if (!deleteEquipment) {
            throw new Error("Equipamento não encontrado!");
        }
        return deleteEquipment;
    };
}
