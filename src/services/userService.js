import bcrypt from "bcryptjs";
import { UserRepository } from "../repositories/userRepository.js";
import { UserDTO } from "../models/dtos/userDTO.js";

const {hash} = bcrypt;

export class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    register = async (userData) => {
        const userExists = await this.userRepository.findByEmail(userData.email);

        if (userExists) {
            throw new Error("Usuário já cadastrado!");
        }

        const passwordHash = await hash(userData.password, 8);
        const userToCreate = {
            name: userData.name,
            email: userData.email,
            password: passwordHash
        };

        const createdUser = await this.userRepository.create(userToCreate);
        return new UserDTO(createdUser);
    }

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