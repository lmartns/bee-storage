import { User } from "../../domain/entities/user.entity";

export type RegisterUserInput = Omit<User, "id" | "createdAt">;
export type UserId = Omit<User, "id">

