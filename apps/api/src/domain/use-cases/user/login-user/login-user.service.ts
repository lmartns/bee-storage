import { IUserRepository } from "../../../repositories/user.repository";
import { HashingProvider } from "../../../services/hashing.provider";
import { TokenJwtProvider } from "../../../services/token.jwt.provider";
import {
  LoginUserUseCase,
  LoginUserUseCaseInput,
  LoginUserUseCaseOutput,
} from "./login-user.use-case";

export class LoginUserService implements LoginUserUseCase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly hashingProvider: HashingProvider,
    private readonly tokenJwtProvider: TokenJwtProvider,
  ) {}

  async execute(input: LoginUserUseCaseInput): Promise<LoginUserUseCaseOutput> {
    const { email, password } = input;
    const { compare } = this.hashingProvider;
    const { sign } = this.tokenJwtProvider;

    const user = await this.userRepository.findByEmail(email);
    const payload = { id: user?.id, email: user?.email };
    const secretKey = process.env.JWT_SECRET;
    const options = { expiresIn: "1h" };

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const validPassword = await compare(password, user?.password);

    if (!validPassword) {
      throw new Error("Invalid credentials");
    }

    const token = sign(payload, secretKey, options);

    return { token };
  }
}
