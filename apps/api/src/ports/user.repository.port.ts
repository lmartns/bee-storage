import { User } from "../domain/models/user.models";
import { DeleteUserDTO } from "../infra/http/dtos/deleteUser";
import { findByIdDTO } from "../infra/http/dtos/findByIdUser.dto";
import { GetAllUsersDto } from "../infra/http/dtos/getAllUsers.dto";
import { UserDto } from "../infra/http/dtos/user.dto";

export interface IUserRepository {
  getAll(): Promise<GetAllUsersDto | null>
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
  findById(id: findByIdDTO): Promise<UserDto | null>
  delete(id: DeleteUserDTO): Promise<void>;
}

