import { User } from "../../../entities/user.entity";

export interface FindUserCaseInput {
  id: string;
}

export type FindUserCaseOutput = User | null;

export abstract class FindUserUseCase {
  abstract execute(input: FindUserCaseInput
  ): Promise<FindUserCaseOutput
  >;
}
