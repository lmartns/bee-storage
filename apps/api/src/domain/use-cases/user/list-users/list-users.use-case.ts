import { User } from "../../../entities/user.entity";

export type ListUsersCaseOutput = User[] | [];

export abstract class ListUsersUseCase {
  abstract execute(): Promise<ListUsersCaseOutput>;
}
