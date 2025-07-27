import z from "zod";

export const idParamDtoSchema = z.object ({
    id: z.uuid()
})

export type IdParamDto = z.infer<typeof idParamDtoSchema>