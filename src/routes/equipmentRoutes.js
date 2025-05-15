import express from "express";
import EquipmentController from "../controllers/equipmentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const routes = express.Router();

/**
 * @swagger
 * tags:
 *  name: Equipamentos
 *  description: Endpoints para gerenciamento de equipamentos
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Equipment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "663cd098d6eaf51ceba2c008"
 *           description: ID único do equipamento
 *         name:
 *           type: string
 *           example: "iMac"
 *           description: Nome do equipamento
 *         segment:
 *           type: string
 *           example: "Desktops & Laptops"
 *           description: Segmento do equipamento
 *         model:
 *           type: string
 *           example: "iMac Pro 2023"
 *           description: Modelo do equipamento
 *         serial_number:
 *           type: string
 *           example: "IMAC2023PRO7890"
 *           description: Número de série do equipamento
 *         status:
 *           type: boolean
 *           example: false
 *           description: Status do equipamento (disponível/indisponível)
 *         acquisition_date:
 *           type: string
 *           format: date-time
 *           example: "2025-04-20T00:00:00.000Z"
 *           description: Data de aquisição do equipamento
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
 *     EquipmentInput:
 *       type: object
 *       required:
 *         - name
 *         - segment
 *         - model
 *         - serial_number
 *       properties:
 *         name:
 *           type: string
 *           example: "MacBook Pro"
 *           description: Nome do equipamento
 *         segment:
 *           type: string
 *           example: "Desktops & Laptops"
 *           description: Segmento do equipamento
 *         model:
 *           type: string
 *           example: "MacBook Pro M3 2023"
 *           description: Modelo do equipamento
 *         serial_number:
 *           type: string
 *           example: "MBP2023M38765"
 *           description: Número de série do equipamento
 *         status:
 *           type: boolean
 *           example: true
 *           description: Status do equipamento (true = disponível, false = indisponível)
 *         acquisition_date:
 *           type: string
 *           format: date-time
 *           example: "2025-04-22T00:00:00.000Z"
 *           description: Data de aquisição do equipamento
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /equipment:
 *  post:
 *      summary: Cria novos equipamentos
 *      tags: [Equipamentos]
 *      security:
 *         - bearerAuth: []
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/EquipmentInput'
 *      responses:
 *          201:
 *              description: Criação de equipamentos realizada com sucesso
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Equipment'
 *          500:
 *              description: Erro interno do servidor
 */
routes.post("/equipment", authMiddleware, EquipmentController.createEquipment);

/**
 * @swagger
 * /equipment:
 *  get:
 *      summary: Lista todos os equipamentos
 *      tags: [Equipamentos]
 *      responses:
 *          200:
 *              description: Lista de equipamentos retornada com sucesso
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Equipment'
 *          500:
 *              description: Erro interno do servidor
 */
routes.get("/equipment", EquipmentController.getAllEquipment);

/**
 * @swagger
 * /equipment/{id}:
 *  get:
 *      summary: Lista equipamento específico
 *      tags: [Equipamentos]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID do equipamento
 *      responses:
 *          200:
 *              description: Equipamento encontrado com sucesso
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Equipment'
 *          404:
 *              description: Equipamento não encontrado
 *          500:
 *              description: Erro interno do servidor
 */
routes.get("/equipment/:id", EquipmentController.getEquipmentById);

/**
 * @swagger
 * /equipment/{id}:
 *  put:
 *      summary: Atualiza equipamento específico
 *      tags: [Equipamentos]
 *      security:
 *         - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID do equipamento
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/EquipmentInput'
 *      responses:
 *          200:
 *              description: Equipamento atualizado com sucesso
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Equipment'
 *          404:
 *              description: Equipamento não encontrado
 *          500:
 *              description: Erro interno do servidor
 */
routes.put("/equipment/:id", authMiddleware, EquipmentController.updateEquipment);

/**
 * @swagger
 * /equipment/{id}:
 *  delete:
 *      summary: Deleta equipamento específico
 *      tags: [Equipamentos]
 *      security:
 *         - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: ID do equipamento
 *      responses:
 *          200:
 *              description: Equipamento excluído com sucesso
 *          404:
 *              description: Equipamento não encontrado
 *          500:
 *              description: Erro interno do servidor
 */
routes.delete("/equipment/:id", authMiddleware, EquipmentController.deleteEquipment);

export default routes;