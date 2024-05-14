import { Button } from "@/components/ui/button";
import { MessageSquarePlus } from "lucide-react";
import { FeedbackForm } from "./FeedbackForm";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function FeedbackSection() {
  return (
    <Popover>
      <PopoverContent align="center" side="top" asChild className="w-96 p-0">
        <Card>
          <CardHeader>Leave a feedback!</CardHeader>
          <CardContent>
            <FeedbackForm />
          </CardContent>
        </Card>
      </PopoverContent>
      <PopoverTrigger asChild className="w-full">
        <Button variant="outline" className="no-underline">
          <MessageSquarePlus className="mr-1 size-4 text-muted-foreground" />
          Feedback
        </Button>
      </PopoverTrigger>
    </Popover>
  );
}
