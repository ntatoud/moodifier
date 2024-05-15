import { z } from "zod";

export type MonthlyData = Record<string, { mood: Mood }>;

export const MOOD_VALUES = ["happy", "sad", "angry", "tired"] as const;
export const MOOD_OPTIONS = MOOD_VALUES.map((value) => ({
  label: value[0]?.toUpperCase() + value.slice(1),
  value,
}));

export type Mood = (typeof MOOD_VALUES)[number];
export const zMood = z
  .enum(["happy", "sad", "angry", "tired"])
  .default("happy");

export type Note = z.infer<ReturnType<typeof zNote>>;
export const zNote = () =>
  z.object({
    mood: zMood,
    body: z.string(),
    date: z.string(),
  });

export type NoteFormFields = z.infer<ReturnType<typeof zNoteFormFields>>;
export const zNoteFormFields = () => zNote().pick({ mood: true, body: true });
