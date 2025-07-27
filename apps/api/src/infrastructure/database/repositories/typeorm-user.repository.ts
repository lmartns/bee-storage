import { Repository } from "typeorm";
import { IUserRepository } from "../../../ports/user.repository.port";
import { User } from "../../../domain/entities/user.entity";
import { AppDataSource } from "../data-source";
import { DeleteUserDTO } from "../../http/dtos/deleteUser";
import {
  GetAllUsersDto,
  getAllUsersSchema,
} from "../../http/dtos/getAllUsers.dto";
import { findByIdDTO } from "../../http/dtos/findByIdUser.dto";

export class TypeORMUserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  async getAll(): Promise<GetAllUsersDto | null> {
    const data = await this.ormRepository.find();
    const users = getAllUsersSchema.parse(data);
    return users;
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.ormRepository.findOneBy({ email });
  }

  async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

 async findById(id: findByIdDTO): Promise<User | null> {
  const teste =  await this.ormRepository.findOneBy(id);
  return teste
}

  async delete(id: DeleteUserDTO): Promise<void> {
    await this.ormRepository.delete(id);
  }
}
