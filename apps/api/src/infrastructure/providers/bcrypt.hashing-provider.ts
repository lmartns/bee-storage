import { HashingProvider } from "../../domain/services/hashing.provider";
import * as bcrypt from "bcryptjs";

export class BcryptHashingProvider implements HashingProvider {
  private readonly SALT = 10;

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.SALT);
  }

  async compare(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
