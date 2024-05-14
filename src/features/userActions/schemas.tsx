import { z } from "zod";

export const FEEDBACK_TYPES = [
  {
    label: "Bug",
    value: "bug",
  },
  {
    label: "Improvement",
    value: "improvement",
  },
  {
    label: "Feature ",
    value: "feature",
  },
  {
    label: "Other",
    value: "other",
  },
] as const;

export const zFeedbackType = () =>
  z.object({
    label: z.string(),
    value: z.string(),
  });

export type FeedbackFormFields = z.infer<
  ReturnType<typeof zFeedbackFormFields>
>;
export const zFeedbackFormFields = () =>
  z.object({
    type: z.string(),
    description: z.string(),
  });
