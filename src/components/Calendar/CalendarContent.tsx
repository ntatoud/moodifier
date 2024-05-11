import {
  addDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  startOfMonth,
  subDays,
} from "date-fns";
import { useCurrentDate, useMonthlyData } from "./store";
import { CalendarDay } from "./CalendarDay";

export const CalendarContent = () => {
  const currentDate = useCurrentDate();
  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const data = useMonthlyData();
  const firstOfMonth = startOfMonth(currentDate);
  const lastOfMonth = endOfMonth(currentDate);

  return (
    <>
      {Array.from({ length: getDay(firstOfMonth) }).map((_, index) => (
        <CalendarDay
          key={`${format(currentDate, "d MMMM yyyy")}_empty_${index}`}
          date={subDays(firstOfMonth, index + 1)}
          variant="outside"
        />
      ))}
      {daysInMonth.map((day) => (
        <CalendarDay
          key={day.toString()}
          date={day}
          variant={data[format(day, "yyyy-MM-dd")]?.mood ?? "empty"}
        />
      ))}
      {Array.from({
        length: 6 - getDay(lastOfMonth),
      }).map((_, index) => (
        <CalendarDay
          key={`${format(currentDate, "d MMMM yyyy")}_empty_${index}`}
          date={addDays(lastOfMonth, index + 1)}
          variant="outside"
        />
      ))}
    </>
  );
};
