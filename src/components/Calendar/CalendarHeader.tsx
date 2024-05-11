import { format } from "date-fns";
import { useCalendarActions, useCurrentDate } from "./store";
import { Button } from "../ui/button";

export const CalendarHeader = () => {
  const currentDate = useCurrentDate();
  const { nextMonth, prevMonth } = useCalendarActions();

  const headerDate = format(currentDate, "MMMM yyyy");
  return (
    <div className="grid grid-cols-3 items-center pb-4">
      <Button className="place-self-start" onClick={prevMonth}>
        Prev
      </Button>
      <h3 className="text-center font-heading text-xl font-bold">
        {headerDate}
      </h3>
      <Button className="place-self-end" onClick={nextMonth}>
        Next
      </Button>
    </div>
  );
};
