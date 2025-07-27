import { User } from "../../../entities/user.entity";
import { IUserRepository } from "../../../repositories/user.repository";
import { HashingProvider } from "../../../services/hashing.provider";
import {
  CreateUserUseCase,
  CreateUserUseCaseInput,
  CreateUserUseCaseOutput,
} from "./create-user.user-case";

export class CreateUserService implements CreateUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashingProvider: HashingProvider
  ) {}

  async execute(
    input: CreateUserUseCaseInput
  ): Promise<CreateUserUseCaseOutput> {
    const userAlreadyExists = await this.userRepository.findByEmail(
      input.email
    );

    if (userAlreadyExists) {
      throw new Error("User with this e-mail already exist");
    }

    const hashedPassword = await this.hashingProvider.hash(input.password);

    const user = new User();
    user.name = input.name;
    user.email = input.email;
    user.password = hashedPassword;
    user.status = input.status;

    await this.userRepository.save(user);

    return user;
  }
}
