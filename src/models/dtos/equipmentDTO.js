export class EquipmentDTO{
    constructor(Equipment){
        this.id = Equipment._id;
        this.name = Equipment.name;
        this.segment = Equipment.segment;
        this.model = Equipment.model;
        this.serial_number = Equipment.serial_number;
        this.status = Equipment.status;
        this.acquisition_date = Equipment.acquisition_date;
    }

    static fromRequest(body){
        return{
            id: body.id,
            name: body.name,
            segment: body.segment,
            model: body.model,
            serial_number: body.serial_number,
            status: body.status,
            acquisition_date: body.acquisition_date,
        };
    }
}
