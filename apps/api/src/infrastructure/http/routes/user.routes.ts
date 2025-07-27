import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { CreateUserService } from "../../../domain/use-cases/user/create-user/create-user.service";
import { DeleteUserService } from "../../../domain/use-cases/user/delete-user/delete-user.service";
import { FindUserService } from "../../../domain/use-cases/user/find-user/find-user.service";
import { ListUsersService } from "../../../domain/use-cases/user/list-users/list-users.service";
import { TypeORMUserRepository } from "../../database/repositories/typeorm-user.repository";
import { BcryptHashingProvider } from "../../providers/bcrypt.hashing-provider";

export const userRoutes = Router();

const userRepository = new TypeORMUserRepository();
const hashingProvider = new BcryptHashingProvider()


const createUser = new CreateUserService(userRepository, hashingProvider);
const findUser = new FindUserService(userRepository);
const listUsers = new ListUsersService(userRepository);
const deleteUser = new DeleteUserService(userRepository);
export const userController = new UserController(
  createUser,
  findUser,
  listUsers,
  deleteUser
);


userRoutes.get("/", (req, res) => userController.listAll(req, res))
userRoutes.get("/:id", (req, res) => userController.findById(req, res))
userRoutes.post("/", (req, res) => userController.create(req, res));
userRoutes.delete("/:id", (req, res) => userController.delete(req, res))
