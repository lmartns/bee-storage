import { User } from "../domain/entities/user.entity";
import { DeleteUserDTO } from "../infrastructure/http/dtos/deleteUser";
import { findByIdDTO } from "../infrastructure/http/dtos/findByIdUser.dto";
import { GetAllUsersDto } from "../infrastructure/http/dtos/getAllUsers.dto";
import { UpdateUserDTO } from "../infrastructure/http/dtos/updateUser.dto";
import { UserDto } from "../infrastructure/http/dtos/user.dto";

export interface IUserRepository {
  getAll(): Promise<GetAllUsersDto | null>
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
  update(id: UpdateUserDTO): Promise<User>;
  findById(id: findByIdDTO): Promise<UserDto | null>
  delete(id: DeleteUserDTO): Promise<void>;
}

