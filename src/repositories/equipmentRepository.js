import { BaseRepository } from "./BaseRepository.js";
import { equipment } from "../models/entity/equipment.js";

export class EquipmentRepository extends BaseRepository {
    constructor(){
        super(equipment);
    }
}
