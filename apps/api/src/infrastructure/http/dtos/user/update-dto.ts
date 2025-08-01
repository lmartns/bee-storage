import { z } from 'zod';

export const UpdateDtoSchema = z.object({
  name: z.string().min(3, "O nome precisa ter pelo menos 3 caracteres"),
  email: z.email("O formato do e-mail é inválido"),
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
}).partial();