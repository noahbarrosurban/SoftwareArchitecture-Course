import { UserRepository } from "../repositories/userRepository.js";
import { UserDTO } from "../models/dtos/userDTO.js";

export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    createUser = async (userData) => {
        const user = UserDTO.fromRequest(userData);
        return await this.userRepository.create(user);
    };

    getAllUsers = async () => {
        return await this.userRepository.findAll();
    };

    getUserById = async (id) => {
        const foundUser = await this.userRepository.findById(id);
        if (!foundUser) {
            throw new Error("Usuário não encontrado!");
        }
        return foundUser;
    };

    updateUser = async (id, userData) => {
        if (!userData || Object.keys(userData).length === 0) {
            throw new Error("Nenhum dado fornecido para atualização!");
        }

        const updatedUser = await this.userRepository.update(id, userData);
        if (!updatedUser) {
            throw new Error("Usuário não encontrado!");
        }
        return updatedUser;
    };

    deleteUser = async (id) => {
        const deletedUser = await this.userRepository.delete(id);
        if (!deletedUser) {
            throw new Error("Usuário não encontrado!");
        }
        return deletedUser;
    };
}