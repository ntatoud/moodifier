"use server";

import { env } from "@/env";
import type { FeedbackFormFields } from "./schemas";

export const issueCreate = async (values: FeedbackFormFields) => {
  const res = await fetch(
    `https://api.github.com/repos/ntatoud/moodifier/issues`,
    {
      method: "POST",
      body: JSON.stringify({
        labels: [values.type],
        title: "Feedback from the app",
        body: values.description,
      }),
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );

  if (!res.ok) {
    throw new Error(`[${res.status}] Failed to create issue`);
  }
};
