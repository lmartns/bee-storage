import z from "zod";

export const findByIdSchema = z.object ({
    id: z.uuid()
})

export type findByIdDTO = z.infer<typeof findByIdSchema>