import { z } from "zod";

export const FEEDBACK_LABELS = [
  "Bug",
  "Improvement",
  "Feature Request",
  "General Feedback",
  "Other",
] as const;

export const zFeedbackLabel = z.enum(FEEDBACK_LABELS);

export type FeedbackFormFields = z.infer<
  ReturnType<typeof zFeedbackFormFields>
>;
export const zFeedbackFormFields = () =>
  z.object({
    label: zFeedbackLabel,
    description: z.string(),
  });
