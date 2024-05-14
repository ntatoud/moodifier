import { Form, FormField } from "@/components/Form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  FEEDBACK_TYPES,
  zFeedbackFormFields,
  type FeedbackFormFields,
} from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useIssueCreate } from "./service";

export const FeedbackForm = () => {
  const createIssue = useIssueCreate();
  const form = useForm<FeedbackFormFields>({
    mode: "onBlur",
    defaultValues: {
      type: FEEDBACK_TYPES[0].value,
      description: "",
    },
    resolver: zodResolver(zFeedbackFormFields()),
  });

  const onSubmit = async (data: FeedbackFormFields) => {
    await createIssue.mutateAsync(data);
  };

  return (
    <Form {...form} onSubmit={onSubmit}>
      <div className="flex flex-col items-start gap-4">
        <FormField
          type="select"
          options={FEEDBACK_TYPES}
          label="What kind of feedback ?"
          name="type"
          control={form.control}
        />

        <FormField
          type="textarea"
          label="Describe your idea"
          name="description"
          control={form.control}
          placeholder="Please describe your idea in detail"
          className="w-full"
          rows={8}
        />
        <Button
          type="submit"
          className="place-self-end"
          isLoading={createIssue.isPending}
          disabled={createIssue.isPending}
        >
          Send
        </Button>
      </div>
    </Form>
  );
};
