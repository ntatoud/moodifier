import { Form } from "@/components/Form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import {
  FEEDBACK_LABELS,
  zFeedbackFormFields,
  type FeedbackFormFields,
} from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";

export const FeedbackForm = () => {
  const form = useForm<FeedbackFormFields>({
    defaultValues: {
      label: "Bug",
      description: "",
    },
    resolver: zodResolver(zFeedbackFormFields()),
  });

  const onSubmit = (data: FeedbackFormFields) => {
    console.log(data);
  };
  return (
    <Form {...form} onSubmit={onSubmit}>
      <div className="flex flex-col items-start gap-4">
        <Select defaultValue={FEEDBACK_LABELS[0].toLowerCase()}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {FEEDBACK_LABELS.map((label) => (
                <SelectItem
                  key={`feedback-select-${label}`}
                  value={label.toLowerCase()}
                >
                  {label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Textarea rows={8} />
        <Button type="submit" className="place-self-end">
          Send
        </Button>
      </div>
    </Form>
  );
};
