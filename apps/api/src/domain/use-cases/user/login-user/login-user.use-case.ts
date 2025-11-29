export interface LoginUserUseCaseInput {
  email: string;
  password: string;
}

export type LoginUserUseCaseOutput = {
  token: Promise<string>;
};

export abstract class LoginUserUseCase {
  abstract execute(
    input: LoginUserUseCaseInput,
  ): Promise<LoginUserUseCaseOutput>;
}
