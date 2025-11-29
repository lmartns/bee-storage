import Jwt from "jsonwebtoken";
import { TokenJwtProvider } from "../../domain/services/token.jwt.provider.js";

export class JwtAuthProvider implements TokenJwtProvider {
  async sign(
    payload: object,
    secretKey: string,
    options: object,
  ): Promise<string> {
    return Jwt.sign(payload, secretKey, options);
  }
}
