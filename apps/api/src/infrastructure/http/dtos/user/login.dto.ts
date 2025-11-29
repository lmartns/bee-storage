import z from "zod";

export const LoginDtoSchema = z.object({
  email: z.email("O formato do e-mail é inválido"),
  password: z.string()
});
