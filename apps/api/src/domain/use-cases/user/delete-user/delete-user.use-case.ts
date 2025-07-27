export interface DeleteUserCaseInput {
  id: string;
}


export abstract class DeleteUserUseCase {
  abstract execute(input: DeleteUserCaseInput): Promise<void>;
}
