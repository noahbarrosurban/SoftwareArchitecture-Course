import { BaseRepository } from "./baseRepository.js";
import { equipment } from "../models/entity/equipment.js";

export class EquipmentRepository extends BaseRepository {
    constructor(){
        super(equipment);
    }
}
