import { createTRPCRouter, protectedProcedure } from "../trpc";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { zMood, zNote } from "@/features/notes/schemas";
import { notes } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

export const notesRouter = createTRPCRouter({
  getByDate: protectedProcedure()
    .input(
      z.object({
        date: z.string(),
      }),
    )
    .output(
      z.object({
        noteData: zNote().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const note = await db.query.notes.findFirst({
        where: (table) => eq(table.date, input.date),
      });

      return { noteData: zNote().optional().parse(note) };
    }),

  create: protectedProcedure()
    .input(zNote())
    .output(
      z.object({
        mood: zMood,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const note = (
        await db
          .insert(notes)
          .values({
            ...input,
          })
          .returning({
            mood: notes.mood,
          })
      )[0];

      if (!note?.mood) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create note",
        });
      }

      return {
        mood: zMood.parse(note?.mood),
      };
    }),

  update: protectedProcedure()
    .input(zNote())
    .output(
      z.object({
        mood: zMood,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db } = ctx;
      const note = (
        await db
          .update(notes)
          .set({
            ...input,
          })
          .where(eq(notes.date, input.date))
          .returning({
            mood: notes.mood,
          })
      )[0];

      if (!note?.mood) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update note",
        });
      }

      return {
        mood: zMood.parse(note.mood),
      };
    }),
});
