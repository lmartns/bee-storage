import { IUserRepository } from "../../../repositories/user.repository";
import { FindUserCaseInput, FindUserCaseOutput, FindUserUseCase } from "./find-user.use-case";

export class FindUserService implements FindUserUseCase {
  constructor(private readonly userRepository: IUserRepository) { }

  async execute(input: FindUserCaseInput): Promise<FindUserCaseOutput> {
    const userEntity = await this.userRepository.findById(input.id)

    return userEntity;
  }
}
