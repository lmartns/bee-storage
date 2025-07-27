import { User } from "../../domain/entities/user.entity";

export type SafeUser = Omit<User, 'id' | 'password'>;