import express from "express";
import UserController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const routes = express.Router();

/**
 * @swagger
 * tags:
 *  name: Usuários
 *  description: Endpoints para gerenciamento de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "663cd098d6eaf51ceba2c010"
 *           description: ID único do usuário
 *         name:
 *           type: string
 *           example: "João Silva"
 *           description: Nome completo do usuário
 *         email:
 *           type: string
 *           example: "joao.silva@email.com"
 *           description: Email do usuário (único no sistema)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-04-20T10:30:00.000Z"
 *           description: Data de criação do registro
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2025-04-22T14:15:00.000Z"
 *           description: Data da última atualização do registro
 *     
 *     UserInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           example: "João Silva"
 *           description: Nome completo do usuário
 *         email:
 *           type: string
 *           example: "joao.silva@email.com"
 *           description: Email do usuário (deve ser único)
 *         password:
 *           type: string
 *           example: "Senha@123"
 *           description: Senha do usuário
 *     
 *     UserUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "João Carlos Silva"
 *           description: Nome completo do usuário
 *         email:
 *           type: string
 *           example: "joao.carlos@email.com"
 *           description: Email do usuário (deve ser único)
 *         password:
 *           type: string
 *           example: "NovaSenha@123"
 *           description: Nova senha do usuário
 *   
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /user:
 *  post:
 *      summary: Cria novos usuários
 *      tags: [Usuários]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/UserInput'
 *      responses:
 *          201:
 *              description: Usuário criado com sucesso
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            message:
 *                              type: string
 *                              example: "Usuário criado com sucesso"
 *                            element:
 *                              $ref: '#/components/schemas/User'
 *          500:
 *              description: Erro interno do servidor
 */
routes.post("/user", UserController.createUser);

/**
 * @swagger
 * /user:
 *  get:
 *      summary: Lista todos os usuários
 *      tags: [Usuários]
 *      security:
 *         - bearerAuth: []
 *      responses:
 *          200:
 *              description: Lista de usuários retornada com sucesso
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *          500:
 *              description: Erro interno do servidor
 */
routes.get("/user", authMiddleware, UserController.getAllUsers);

/**
 * @swagger
 * /user/{id}:
 *  get:
 *      summary: Lista usuário específico
 *      tags: [Usuários]
 *      security:
 *         - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID do usuário
 *      responses:
 *          200:
 *              description: Usuário encontrado com sucesso
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          404:
 *              description: Usuário não encontrado
 *          500:
 *              description: Erro interno do servidor
 */
routes.get("/user/:id", authMiddleware, UserController.getUserById);

/**
 * @swagger
 * /user/{id}:
 *  put:
 *      summary: Atualiza usuário específico
 *      tags: [Usuários]
 *      security:
 *         - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID do usuário
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/UserUpdate'
 *      responses:
 *          200:
 *              description: Usuário atualizado com sucesso
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            message:
 *                              type: string
 *                              example: "Usuário atualizado com sucesso"
 *                            element:
 *                              $ref: '#/components/schemas/User'
 *          404:
 *              description: Usuário não encontrado
 *          500:
 *              description: Erro interno do servidor
 */
routes.put("/user/:id", authMiddleware, UserController.updateUser);

/**
 * @swagger
 * /user/{id}:
 *  delete:
 *      summary: Deleta usuário específico
 *      tags: [Usuários]
 *      security:
 *         - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID do usuário
 *      responses:
 *          200:
 *              description: Usuário excluído com sucesso
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                            message:
 *                              type: string
 *                              example: "Usuário deletado com sucesso"
 *          500:
 *              description: Erro interno do servidor
 */
routes.delete("/user/:id", authMiddleware, UserController.deleteUser);

export default routes;