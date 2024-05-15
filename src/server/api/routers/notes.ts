import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { zNote } from "@/features/notes/schemas";

export const notesRouter = createTRPCRouter({
  getByDate: protectedProcedure()
    .input(
      z.object({
        date: z.string(),
      }),
    )
    .output(zNote().optional())
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const note = await db.query.notes.findFirst({
        where: (table) => eq(table.date, input.date),
      });

      return zNote().parse(note);
    }),
});
