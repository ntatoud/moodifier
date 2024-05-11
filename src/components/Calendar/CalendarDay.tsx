import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { format, isAfter, isToday } from "date-fns";
import { Tooltip } from "@/components/Tooltip";

const calendarDayVariants = cva(
  "min-w-8 min-h-8 size-[10vw] md:size-20 border border-input p-2 text-center rounded-lg ",
  {
    variants: {
      variant: {
        outside: "cursor- opacity-20",
        empty: "cursor-not-allowed ",
        happy: "bg-green-600",
        tired: "bg-gray-600",
        sad: "bg-violet-600",
        angry: "bg-red-600",
      },
    },
  },
);
type CalendarDayProps = {
  date: Date;
} & VariantProps<typeof calendarDayVariants>;
export const CalendarDay = ({ date, variant }: CalendarDayProps) => {
  if (variant === "outside") {
    return (
      <div className={cn(calendarDayVariants({ variant }))}>
        {format(date, "d")}
      </div>
    );
  }

  if (isToday(date)) {
    return (
      <div className={cn(calendarDayVariants({ variant }))}>
        {format(date, "d")}
      </div>
    );
  }

  if (isAfter(date, new Date())) {
    return (
      <Tooltip title="This is in the future !" delay={0.2}>
        <div
          className={cn(
            calendarDayVariants({ variant }),
            "bg-muted-foreground opacity-50 ",
          )}
        >
          {format(date, "d")}
        </div>
      </Tooltip>
    );
  }

  return (
    <div className={cn(calendarDayVariants({ variant }))}>
      {format(date, "d")}
    </div>
  );
};
