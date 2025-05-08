import express from "express";
import UserController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const routes = express.Router();

routes.get("/user", authMiddleware, UserController.getAllUsers);
routes.post("/user", UserController.createUser);
routes.get("/user/:id", authMiddleware, UserController.getUserById);
routes.put("/user/:id", authMiddleware, UserController.updateUser);
routes.delete("/user/:id", authMiddleware, UserController.deleteUser);

export default routes;