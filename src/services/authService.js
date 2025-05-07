import { user } from "../models/entity/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import jsonSecret from "../config/jsonSecret.js";

const { compare } = bcrypt;

class AuthService {
    async login(dto) {
        try {
            const userVerify = await user.findOne({
                email: dto.email,
            }).select("id email password");

            if (!userVerify) {
                throw new Error("Usuário não encontrado");
            }

            const passwordMatch = await compare(dto.password, userVerify.password);

            if (!passwordMatch) {
                throw new Error("Usuário ou senha inválidos");
            }

            const accessToken = jwt.sign(
                {
                    id: userVerify.id,
                    email: userVerify.email,
                },
                jsonSecret.secret,
                {
                    expiresIn: 86400
                }
            );
            return { accessToken };

        } catch (error) {
            throw new Error("Erro ao fazer login: " + error.message);
        }
    }
}

export default AuthService;