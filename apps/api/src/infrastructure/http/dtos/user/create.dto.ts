import { z } from 'zod';
import { UserStatus } from '../../../../types/enums/userStatus.enum';

export const createDtoSchema = z.object({
  name: z.string().min(3, "O nome é obrigatório e precisa de no mínimo 3 caracteres."),
  email: z.email("Formato de e-mail inválido."),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres."),
  status: z.enum(UserStatus)
});

export type CreateDTO = z.infer<typeof createDtoSchema>;