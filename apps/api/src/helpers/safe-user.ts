import { User } from "../domain/entities/user.entity";
import { SafeUser } from "../types/user/safe-user.type";

export function toSafeUser(user: User): SafeUser {
  const { id, password, ...safe } = user;
  return safe;
}