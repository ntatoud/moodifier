"use server";

import ky from "ky";
import { env } from "@/env";
import type { FeedbackFormFields } from "./schemas";

export const issueCreate = async (values: FeedbackFormFields) => {
  const json = await ky
    .post(`https://api.github.com/repos/ntatoud/moodifier/issues`, {
      json: {
        labels: [values.type, "from a user"],
        title: values.title,
        body: values.description,
      },
      headers: {
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
    .json();

  console.log(json);
};
