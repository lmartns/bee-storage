import { User } from "../../../entities/user.entity";

export interface GetByIdCaseInput {
  id: string;
}

export type GetByIdCaseOutput = User | null;

export abstract class GetByIdUseCase {
  abstract execute(input: GetByIdCaseInput): Promise<GetByIdCaseOutput>;
}
