import { useMutation } from "@tanstack/react-query";
import type { FeedbackFormFields } from "./schemas";
import { toast } from "sonner";
import { issueCreate } from "./actions";

export const useIssueCreate = () => {
  return useMutation({
    mutationKey: ["create-issue"],
    mutationFn: (values: FeedbackFormFields) => issueCreate(values),
    onSuccess: () => {
      toast.success("Feedback sent successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
