import { IUserRepository } from "../../../repositories/user.repository";
import {
  UpdateUserUseCase,
  UpdateUserUseCaseInput,
  UpdateUserUseCaseOutput,
} from "./update-user.use-case";

export class UpdateUserService implements UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: UpdateUserUseCaseInput): Promise<UpdateUserUseCaseOutput> {
    const { id, ...updates } = input;

    const user = await this.userRepository.findById(id);
    if (!user) throw new Error("User not found");

    Object.assign(user, updates);

    return await this.userRepository.save(user);
  }
}
