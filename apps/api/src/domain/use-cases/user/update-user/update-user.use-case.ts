import {User} from "../../../entities/user.entity";

export interface UpdateUserUseCaseInput extends Partial<Omit<User, 'id' | 'createdAt'>> {
  id: string;
}

export type UpdateUserUseCaseOutput = User;

export abstract class UpdateUserUseCase {
    abstract execute(input: UpdateUserUseCaseInput): Promise<UpdateUserUseCaseOutput>
}