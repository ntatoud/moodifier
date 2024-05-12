import { z } from "zod";

export type LoginFormFields = z.infer<ReturnType<typeof zLoginFormFields>>;
export const zLoginFormFields = () =>
  z.object({
    username: z.string(),
    password: z.string(),
  });
