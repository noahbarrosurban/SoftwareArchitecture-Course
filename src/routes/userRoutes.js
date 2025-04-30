import express from "express";
import UserController from "../controllers/userController.js";

const routes = express.Router();

routes.get("/user", UserController.getAllUsers);
routes.post("/user", UserController.createUser);
routes.get("/user/:id", UserController.getUserById);
routes.put("/user/:id", UserController.updateUser);
routes.delete("/user/:id", UserController.deleteUser);

export default routes;