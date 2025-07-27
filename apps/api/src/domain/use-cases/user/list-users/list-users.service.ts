import { IUserRepository } from "../../../repositories/user.repository";
import { ListUsersCaseOutput, ListUsersUseCase } from "./list-users.use-case";

export class ListUsersService implements ListUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) { }


  async execute(): Promise<ListUsersCaseOutput> {
    const users = await this.userRepository.findAll()
    return users;
  }
}
