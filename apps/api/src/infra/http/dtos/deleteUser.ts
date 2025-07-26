import z from "zod";

export const deleteUserSchema = z.object ({
    id: z.uuid()
})

export type DeleteUserDTO = z.infer<typeof deleteUserSchema>