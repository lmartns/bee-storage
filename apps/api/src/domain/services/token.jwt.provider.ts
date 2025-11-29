export abstract class TokenJwtProvider {
  abstract sign(
    payload: object,
    secretKey: string,
    options: object,
  ): Promise<string>;
}
