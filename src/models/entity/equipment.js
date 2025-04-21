import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
    name: {type: String, required: [true,"Nome do equipamento é obrigatório"]},
    segment: {type: String },
    model: {type: String },
    serial_number: {type: String },
    status: {type: Boolean },
    acquisition_date: {type: Date },
});

const equipment = mongoose.model("equipment", equipmentSchema);

export {equipment, equipmentSchema};
