import { z } from "zod";

export type Note = z.infer<ReturnType<typeof zNote>>;
export const zNote = () =>
  z.object({
    id: z.string(),
    title: z.string(),
    body: z.string(),
    date: z.string(),
  });
