import { describe, expect, it, jest, afterEach } from '@jest/globals';
import { createUserController } from '../../controllers/userController.js';

describe('Testando o UserController', () => {
    const mockRequest = (data = {}, params = {}) => ({ body: data, params });
    const mockResponse = () => {
        const res = {};
        res.status = jest.fn().mockReturnValue(res);
        res.json = jest.fn().mockReturnValue(res);
        res.send = jest.fn().mockReturnValue(res);
        return res;
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('Deve criar um novo usuário', async () => {
        const newUser = {
            name: 'Usuario 1',
            email: 'usuario1@email.com',
            password: 'senha#123',
        };

        const mockUserService = {
            register: jest.fn().mockResolvedValue({
                id: '1',
                name: 'Usuario 1',
                email: 'usuario1@email.com',
            }),
        };

        const UserController = createUserController(mockUserService);

        const req = mockRequest(newUser);
        const res = mockResponse();

        await UserController.createUser(req, res);

        expect(mockUserService.register).toHaveBeenCalledWith(newUser);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Usuário criado com sucesso',
            element: expect.any(Object),
        });
    });

    it('Deve retornar 500 caso não crie usuário', async () => {
        const newUser = {
            name: 'Usuario 1',
            email: 'usuario1@email.com',
            password: 'senha#123',
        };

        const mockUserService = {
            register: jest.fn().mockRejectedValue(new Error('Erro ao criar usuário')),
        };

        const UserController = createUserController(mockUserService);

        const req = mockRequest(newUser);
        const res = mockResponse();

        await UserController.createUser(req, res);

        expect(mockUserService.register).toHaveBeenCalledWith(newUser);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Erro ao criar usuário',
            error: 'Erro ao criar usuário',
        });
    });

    it('Deve retornar todos os usuários', async () => {
        const mockUsers = [
            {
                id: '1',
                name: 'Usuario 1',
                email: 'usuario1@email.com',
            },
            {
                id: '2',
                name: 'Usuario 2',
                email: 'usuario2@email.com',
            }
        ];

        const mockUserService = {
            getAllUsers: jest.fn().mockResolvedValue(mockUsers),
        };

        const UserController = createUserController(mockUserService);

        const req = mockRequest();
        const res = mockResponse();

        await UserController.getAllUsers(req, res);

        expect(mockUserService.getAllUsers).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Array));
        expect(res.json).toHaveBeenCalledWith(
            expect.arrayContaining([
                expect.any(Object),
                expect.any(Object)
            ])
        );
    });

    it('Deve retornar 500 caso não encontre usuários', async () => {
        const mockUserService = {
            getAllUsers: jest.fn().mockRejectedValue(new Error('Erro ao buscar usuários')),
        };

        const UserController = createUserController(mockUserService);

        const req = mockRequest();
        const res = mockResponse();

        await UserController.getAllUsers(req, res);

        expect(mockUserService.getAllUsers).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Erro ao buscar usuários',
            error: 'Erro ao buscar usuários',
        });
    });

    it('Deve retornar um usuário pelo ID', async () => {
        const mockUser = {
            id: '1',
            name: 'Usuario 1',
            email: 'usuario1@email.com',
        };

        const mockUserService = {
            getUserById: jest.fn().mockResolvedValue(mockUser),
        };

        const UserController = createUserController(mockUserService);

        const req = mockRequest({}, { id: '1' });
        const res = mockResponse();

        await UserController.getUserById(req, res);

        expect(mockUserService.getUserById).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.any(Object));
    });

    it('Deve retornar 500 caso não encontre o usuário pelo ID', async () => {
        const mockUserService = {
            getUserById: jest.fn().mockRejectedValue(new Error('Erro ao buscar usuário')),
        };

        const UserController = createUserController(mockUserService);

        const req = mockRequest({}, { id: '1' });
        const res = mockResponse();

        await UserController.getUserById(req, res);

        expect(mockUserService.getUserById).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Erro ao buscar usuário',
            error: 'Erro ao buscar usuário',
        });
    });

    it('Deve atualizar um usuário', async () => {
        const updateData = {
            name: 'Usuario Atualizado',
            email: 'usuarioatualizado@email.com',
        };

        const updatedUser = {
            id: '1',
            name: 'Usuario Atualizado',
            email: 'usuarioatualizado@email.com',
        };

        const mockUserService = {
            updateUser: jest.fn().mockResolvedValue(updatedUser),
        };

        const UserController = createUserController(mockUserService);

        const req = mockRequest(updateData, { id: '1' });
        const res = mockResponse();

        await UserController.updateUser(req, res);

        expect(mockUserService.updateUser).toHaveBeenCalledWith('1', updateData);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Usuário atualizado com sucesso',
            element: expect.any(Object),
        });
    });

    it('Deve retornar 500 caso não atualize o usuário', async () => {
        const updateData = {
            name: 'Usuario Atualizado',
            email: 'usuarioatualizado@email.com',
        };

        const mockUserService = {
            updateUser: jest.fn().mockRejectedValue(new Error('Erro ao atualizar usuário')),
        };

        const UserController = createUserController(mockUserService);

        const req = mockRequest(updateData, { id: '1' });
        const res = mockResponse();

        await UserController.updateUser(req, res);

        expect(mockUserService.updateUser).toHaveBeenCalledWith('1', updateData);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Erro ao atualizar usuário',
            error: 'Erro ao atualizar usuário',
        });
    });

    it('Deve deletar um usuário', async () => {
        const deletedUser = {
            id: '1',
            name: 'Usuario 1',
            email: 'usuario1@email.com',
        };

        const mockUserService = {
            deleteUser: jest.fn().mockResolvedValue(deletedUser),
        };

        const UserController = createUserController(mockUserService);

        const req = mockRequest({}, { id: '1' });
        const res = mockResponse();

        await UserController.deleteUser(req, res);

        expect(mockUserService.deleteUser).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Usuário deletado com sucesso',
        });
    });

    it('Deve retornar 500 caso não delete o usuário', async () => {
        const mockUserService = {
            deleteUser: jest.fn().mockRejectedValue(new Error('Erro ao deletar usuário')),
        };

        const UserController = createUserController(mockUserService);

        const req = mockRequest({}, { id: '1' });
        const res = mockResponse();

        await UserController.deleteUser(req, res);

        expect(mockUserService.deleteUser).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Erro ao deletar usuário',
            error: 'Erro ao deletar usuário',
        });
    });
});