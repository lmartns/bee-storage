import { UserStatus } from "../../../../types/enums/userStatus.enum";
import { User } from "../../../entities/user.entity";

export interface CreateUserUseCaseInput {
  name: string;
  password: string;
  email: string;
  status: UserStatus;
}

export type CreateUserUseCaseOutput = User;

export abstract class CreateUserUseCase {
  abstract execute(
    input: CreateUserUseCaseInput
  ): Promise<CreateUserUseCaseOutput>;
}
