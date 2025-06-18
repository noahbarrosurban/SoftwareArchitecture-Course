import { UserDTO } from "../models/dtos/userDTO.js";
import { UserService } from "../services/userService.js";

const userService = new UserService();

const UserController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.getAllUsers();
            const userDTOs = users.map((user) => new UserDTO(user));
            res.status(200).json(userDTOs);
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar usuários", error: error.message });
        }
    },

    createUser: async (req, res) => {
        try {
            const newUser = await userService.register(req.body);
            res.status(201).json({
                message: "Usuário criado com sucesso",
                element: new UserDTO(newUser),
            });
        } catch (error) {
            res.status(500).json({ message: "Erro ao criar usuário", error: error.message });
        }
    },

    getUserById: async (req, res) => {
        try {
            const userById = await userService.getUserById(req.params.id);
            if (!userById) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            res.status(200).json(new UserDTO(userById));
        } catch (error) {
            res.status(500).json({ message: "Erro ao buscar usuário", error: error.message });
        }
    },

    updateUser: async (req, res) => {
        try {
            const updatedUser = await userService.updateUser(req.params.id, req.body);
            if (!updatedUser) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            res.status(200).json({
                message: "Usuário atualizado com sucesso",
                element: new UserDTO(updatedUser),
            });
        } catch (error) {
            res.status(500).json({ message: "Erro ao atualizar usuário", error: error.message });
        }
    },

    deleteUser: async (req, res) => {
        try {
            const deletedUser = await userService.deleteUser(req.params.id);
            if (!deletedUser) {
                return res.status(404).json({ message: "Usuário não encontrado" });
            }
            res.status(200).json({ message: "Usuário deletado com sucesso" });
        } catch (error) {
            res.status(500).json({ message: "Erro ao deletar usuário", error: error.message });
        }
    },
};

export default UserController;