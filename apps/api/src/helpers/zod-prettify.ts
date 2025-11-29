import z, { ZodError } from "zod";

export function zodPrettyError(error: ZodError) {
  const pretty = z.prettifyError(error);
  return pretty;
}
