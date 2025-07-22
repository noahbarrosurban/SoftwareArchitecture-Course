import express from 'express';
import AuthController from '../controllers/authController.js';

const routes = express.Router();

/**
 * @swagger
 * tags:
 *  name: Autenticação
 *  description: Endpoints para autenticação de usuários
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: "joao.silva@email.com"
 *           description: Email do usuário cadastrado
 *         password:
 *           type: string
 *           example: "Senha@123"
 *           description: Senha do usuário
 *     
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2M2NkMDk4ZDZlYWY1MWNlYmEyYzAxMCIsImVtYWlsIjoiam9hby5zaWx2YUBlbWFpbC5jb20iLCJpYXQiOjE3MTYzMjg0MzcsImV4cCI6MTcxNjQxNDgzN30.BCx_jL5iuPXQDp7TE-R9teTG3H-gfTcbdTwTe4QkBN8"
 *           description: JWT token para autenticação nas rotas protegidas
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: string
 *               example: "663cd098d6eaf51ceba2c010"
 *               description: ID único do usuário
 *             name:
 *               type: string
 *               example: "João Silva"
 *               description: Nome completo do usuário
 *             email:
 *               type: string
 *               example: "joao.silva@email.com"
 *               description: Email do usuário
 *   
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *      summary: Realiza login de usuário e retorna token JWT
 *      tags: [Autenticação]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/LoginInput'
 *      responses:
 *          200:
 *              description: Login realizado com sucesso
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/LoginResponse'
 *          401:
 *              description: Credenciais inválidas
 *          500:
 *              description: Erro interno do servidor
 */
routes.post('/auth/login', AuthController.login);

export default routes;