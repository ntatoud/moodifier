import { Button, buttonVariants } from "@/components/ui/button";
import { Heart } from "lucide-react";
import FeedbackSection from "./FeedbackSection";
import { cn } from "@/lib/utils";

export default function UserActions() {
  return (
    <div className="flex w-full flex-col gap-1 place-self-end">
      <FeedbackSection />

      <Button variant="outline" className="group" asChild>
        <a
          href="https://www.paypal.com/paypalme/ntatoud"
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <Heart className="mr-1 size-4 text-red-300 group-hover:fill-red-300" />
          Support
        </a>
      </Button>
    </div>
  );
}
