import { z } from 'zod'
import { userSchema } from './user.dto'

export const getAllUsersSchema = z.array(userSchema)

export type GetAllUsersDto = z.infer<typeof getAllUsersSchema>;
