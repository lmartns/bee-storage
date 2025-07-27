import { Repository } from "typeorm";
import { User } from "../../../domain/entities/user.entity";
import { AppDataSource } from "../data-source";
import { IUserRepository } from "../../../domain/repositories/user.repository";

export class TypeORMUserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  async findAll(): Promise<User[] | []> {
    return this.ormRepository.find();
  }

  async findById(id: string): Promise<User | null> {
    return this.ormRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.ormRepository.findOneBy({ email });
  }

  async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    this.ormRepository.delete(id);
  }
}
