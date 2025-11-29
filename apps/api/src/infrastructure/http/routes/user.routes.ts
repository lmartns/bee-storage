import { Router } from "express";
import { CreateUserService } from "../../../domain/use-cases/user/create-user/create-user.service.js";
import { DeleteUserService } from "../../../domain/use-cases/user/delete-user/delete-user.service.js";
import { FindUserService } from "../../../domain/use-cases/user/find-user/find-user.service.js";
import { ListUsersService } from "../../../domain/use-cases/user/list-users/list-users.service.js";
import { LoginUserService } from "../../../domain/use-cases/user/login-user/login-user.service.js";
import { UpdateUserService } from "../../../domain/use-cases/user/update-user/update-user.service.js";
import { TypeORMUserRepository } from "../../database/repositories/typeorm-user.repository.js";
import { BcryptHashingProvider } from "../../providers/bcrypt.hashing-provider.js";
import { JwtAuthProvider } from "../../providers/jwt.auth-provider.js";
import { UserController } from "../controllers/user.controller.js";

export const userRoutes = Router();

const userRepository = new TypeORMUserRepository();
const hashingProvider = new BcryptHashingProvider();
const tokenProvider = new JwtAuthProvider();

const createUser = new CreateUserService(userRepository, hashingProvider);
const findUser = new FindUserService(userRepository);
const listUsers = new ListUsersService(userRepository);
const deleteUser = new DeleteUserService(userRepository);
const updateUser = new UpdateUserService(userRepository);
const loginUser = new LoginUserService(
  userRepository,
  hashingProvider,
  tokenProvider,
);
export const userController = new UserController(
  createUser,
  findUser,
  listUsers,
  updateUser,
  deleteUser,
  loginUser,
);

userRoutes.get("/", (req, res) => userController.listAll(req, res));
userRoutes.get("/:id", (req, res) => userController.findById(req, res));
userRoutes.post("/", (req, res) => userController.create(req, res));
userRoutes.delete("/:id", (req, res) => userController.delete(req, res));
userRoutes.put("/update/:id", (req, res) => userController.update(req, res));
userRoutes.post("/login", (req, res) => userController.login(req, res));
