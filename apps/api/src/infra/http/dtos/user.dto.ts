import { z } from 'zod'
import { UserStatus } from '../../../types/enums/userStatus.enum'

export const userSchema = z.object({
    id: z.uuid(),
    name: z.string(),
    email: z.email(),
    status: z.enum(UserStatus)
})

export type UserDto = z.infer<typeof userSchema>;