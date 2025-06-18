import { describe, expect, it, jest, afterEach } from '@jest/globals';
import EquipmentController from '../../controllers/equipmentController.js';
import * as EquipmentModule from '../../models/entity/equipment.js';

jest.mock('../../models/entity/equipment.js');

describe('Testando o EquipmentController', () => {

    const mockRequest = (data = {}, params = {}) => ({ body: data, params });
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        return res;
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Deve criar um novo equipamento', async () => {
        const newEquipment = {
            name: 'Equipamento 1',
            segment: 'Segmento 1',
            model: 'Modelo 1',
            serial_number: '123456',
            status: true,
            acquisition_date: new Date(),
        };

        EquipmentModule.equipment.create = jest.fn().mockResolvedValue(newEquipment);

        const req = mockRequest(newEquipment);
        const res = mockResponse();

        await EquipmentController.createEquipment(req, res);

        expect(EquipmentModule.equipment.create).toHaveBeenCalledWith(newEquipment);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Equipamento criado com sucesso',
            element: newEquipment,
        });
    });

    it('Deve retornar 500 caso não crie equipamento', async () => {
        const newEquipment = {
            name: 'Equipamento 1',
            segment: 'Segmento 1',
            model: 'Modelo 1',
            serial_number: '123456',
            status: true,
            acquisition_date: new Date(),
        };
        EquipmentModule.equipment.create = jest.fn().mockRejectedValue(new Error('Erro ao criar equipamento'));
        const req = mockRequest(newEquipment);
        const res = mockResponse();
        await EquipmentController.createEquipment(req, res);
        expect(EquipmentModule.equipment.create).toHaveBeenCalledWith(newEquipment);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Erro ao criar equipamento',
            error: 'Erro ao criar equipamento',
        });
    });

    it('Deve retornar todos os equipamentos', async () => {
        const equipmentsMock = [{
            name: 'Equipamento 1',
            segment: 'Segmento 1',
            model: 'Modelo 1',
            serial_number: '123456',
            status: true,
            acquisition_date: new Date(),
        },
        {
            name: 'Equipamento 2',
            segment: 'Segmento 2',
            model: 'Modelo 2',
            serial_number: '654321',
            status: false,
            acquisition_date: new Date(),
        }];

        EquipmentModule.equipment.find = jest.fn().mockResolvedValue(equipmentsMock);

        const req = mockRequest();
        const res = mockResponse();

        await EquipmentController.getAllEquipment(req, res);

        expect(EquipmentModule.equipment.find).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(equipmentsMock);
    });

    it('Deve retornar 500 caso não encontre equipamentos', async () => {
        EquipmentModule.equipment.find = jest.fn().mockRejectedValue(new Error('Erro ao buscar equipamentos'));

        const req = mockRequest();
        const res = mockResponse();

        await EquipmentController.getAllEquipment(req, res);

        expect(EquipmentModule.equipment.find).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Erro ao buscar equipamentos',
            error: 'Erro ao buscar equipamentos',
        });
    });

    it('Deve retornar um equipamento pelo ID', async () => {
        const equipmentMock = {
            name: 'Equipamento 1',
            segment: 'Segmento 1',
            model: 'Modelo 1',
            serial_number: '123456',
            status: true,
            acquisition_date: new Date(),
        };

        EquipmentModule.equipment.findById = jest.fn().mockResolvedValue(equipmentMock);

        const req = mockRequest({}, { id: '123' });
        const res = mockResponse();

        await EquipmentController.getEquipmentById(req, res);

        expect(EquipmentModule.equipment.findById).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(equipmentMock);
    });

    it('Deve retornar 500 caso não encontre o equipamento pelo ID', async () => {
        EquipmentModule.equipment.findById = jest.fn().mockRejectedValue(new Error('Erro ao buscar equipamento'));
        const req = mockRequest({}, { id: '123' });
        const res = mockResponse();
        await EquipmentController.getEquipmentById(req, res);
        expect(EquipmentModule.equipment.findById).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Erro ao buscar equipamento',
            error: 'Erro ao buscar equipamento',
        });
    });

    it('Deve atualizar um equipamento', async () => {
        const updatedEquipment = {
            name: 'Equipamento 1',
            segment: 'Segmento 1',
            model: 'Modelo 1',
            serial_number: '123456',
            status: true,
            acquisition_date: new Date(),
        };

        EquipmentModule.equipment.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedEquipment);

        const req = mockRequest(updatedEquipment, { id: '123' });
        const res = mockResponse();

        await EquipmentController.updateEquipment(req, res);

        expect(EquipmentModule.equipment.findByIdAndUpdate).toHaveBeenCalledWith('123', updatedEquipment, { new: true });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Equipamento atualizado com sucesso',
            element: updatedEquipment,
        });
    });

    it('Deve retornar 500 caso não atualize o equipamento', async () => {
        const updatedEquipment = {
            name: 'Equipamento 1',
            segment: 'Segmento 1',
            model: 'Modelo 1',
            serial_number: '123456',
            status: true,
            acquisition_date: new Date(),
        };

        EquipmentModule.equipment.findByIdAndUpdate = jest.fn().mockRejectedValue(new Error('Erro ao atualizar equipamento'));

        const req = mockRequest(updatedEquipment, { id: '123' });
        const res = mockResponse();

        await EquipmentController.updateEquipment(req, res);

        expect(EquipmentModule.equipment.findByIdAndUpdate).toHaveBeenCalledWith('123', updatedEquipment, { new: true });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Erro ao atualizar equipamento',
            error: 'Erro ao atualizar equipamento',
        });
    });

    it('Deve deletar um equipamento', async () => {
        const deletedEquipment = {
            name: 'Equipamento 1',
            segment: 'Segmento 1',
            model: 'Modelo 1',
            serial_number: '123456',
            status: true,
            acquisition_date: new Date(),
        };

        EquipmentModule.equipment.findByIdAndDelete = jest.fn().mockResolvedValue(deletedEquipment);

        const req = mockRequest({}, { id: '123' });
        const res = mockResponse();

        await EquipmentController.deleteEquipment(req, res);

        expect(EquipmentModule.equipment.findByIdAndDelete).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ message: 'Equipamento deletado com sucesso' });
    });

    it('Deve retornar 500 caso não delete o equipamento', async () => {
        EquipmentModule.equipment.findByIdAndDelete = jest.fn().mockRejectedValue(new Error('Erro ao deletar equipamento'));
        const req = mockRequest({}, { id: '123' });
        const res = mockResponse();
        await EquipmentController.deleteEquipment(req, res);
        expect(EquipmentModule.equipment.findByIdAndDelete).toHaveBeenCalledWith('123');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Erro ao deletar equipamento',
            error: 'Erro ao deletar equipamento',
        });
    });
});