import * as bcrypt from "bcryptjs";
import { IUserRepository } from "../../ports/user.repository.port";
import { User } from "../models/user.models";
import { CreateUserDTO } from "../../infrastructure/http/dtos/createUser.dto";
import { DeleteUserDTO } from "../../infrastructure/http/dtos/deleteUser";
import {
  GetAllUsersDto,
  getAllUsersSchema,
} from "../../infrastructure/http/dtos/getAllUsers.dto";
import { findByIdDTO } from "../../infrastructure/http/dtos/findByIdUser.dto";
import { UserDto, userSchema } from "../../infrastructure/http/dtos/user.dto";

export class UserService {
  constructor(private readonly userRepository: IUserRepository) {}

  async getAll(): Promise<GetAllUsersDto> {
    const data = await this.userRepository.getAll();
    const users = getAllUsersSchema.parse(data);
    return users;
  }

  async getById(id: findByIdDTO): Promise<UserDto> {
    const data = await this.userRepository.findById(id);

    const user = userSchema.parse(data);
    return user;
  }

  async register(data: CreateUserDTO): Promise<Omit<User, "password">> {
    const existingUser = await this.userRepository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already in use.");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = hashedPassword;
    user.status = data.status;

    const savedUser = await this.userRepository.save(user);

    const { password, ...userWithoutPassword } = savedUser;
    return userWithoutPassword;
  }

  async delete(id: DeleteUserDTO): Promise<void> {
    await this.userRepository.delete(id);
  }
}
