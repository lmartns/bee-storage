import { User } from "../../domain/models/user.models";

export type RegisterUserInput = Omit<User, "id" | "createdAt">;
export type UserId = Omit<User, "id">

