import z from "zod";

export const updateUserSchema = z.object({
    id: z.uuid()
})

export type UpdateUserDTO = z.infer<typeof updateUserSchema>