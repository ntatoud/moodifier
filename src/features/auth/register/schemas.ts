import { z } from "zod";

export type RegisterFormFields = z.infer<
  ReturnType<typeof zRegisterFormFields>
>;
export const zRegisterFormFields = () =>
  z
    .object({
      username: z.string(),
      password: z.string().min(8),
      passwordConfirm: z.string().min(8),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords do not match",
      path: ["passwordConfirm"],
    });
