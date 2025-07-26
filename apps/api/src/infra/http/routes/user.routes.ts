import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { UserService } from "../../../domain/services/user.service";
import { TypeORMUserRepository } from "../../database/repositories/typeorm-user.repository";

export const userRoutes = Router();

const userRepository = new TypeORMUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRoutes.get("/", (req, res) => userController.getALl(req, res))
userRoutes.get("/:id", (req, res) => userController.getById(req, res))
userRoutes.post("/", (req, res) => userController.create(req, res));
userRoutes.delete("/:id", (req, res) => userController.delete(req, res))
