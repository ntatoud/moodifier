import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { format, isAfter, isToday } from "date-fns";
import { Tooltip } from "@/components/Tooltip";
import { type UserTheme, userTheme } from "@/server/mocks/user";
import Link from "next/link";

const getCalendarDayVariant = ({ colors }: UserTheme) => {
  return cva(
    "min-w-8 min-h-8 place-content-center md:place-content-start aspect-square max-w-20 max-h-20 size-[10vw] md:size-[8vw] lg:size-20 border border-input p-2 text-center rounded-lg ",
    {
      variants: {
        variant: {
          outside: "cursor-not-allowed opacity-20",
          empty: "",
          future: "bg-muted-foreground opacity-50",
          ...colors.mood,
        },
      },
    },
  );
};

type CalendarDayProps = {
  date: Date;
} & VariantProps<ReturnType<typeof getCalendarDayVariant>>;
export const CalendarDay = ({ date, variant }: CalendarDayProps) => {
  const calendarDayVariants = getCalendarDayVariant(userTheme);
  const variantClassName = calendarDayVariants({ variant });

  if (variant === "outside") {
    return <div className={cn(variantClassName)}>{format(date, "d")}</div>;
  }

  if (isAfter(date, new Date())) {
    return (
      <Tooltip title="This is in the future !" delay={0.2}>
        <div className={cn(variantClassName)}>{format(date, "d")}</div>
      </Tooltip>
    );
  }

  return (
    <Link
      href={`/notes/${format(date, "yyyy-MM-dd")}`}
      className={cn(variantClassName, {
        "border-2 border-foreground": isToday(date),
      })}
    >
      {format(date, "d")}
    </Link>
  );
};
