"use client";

import { CalendarStoreProvider } from "./store";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarContent } from "./CalendarContent";
import type { MonthlyData } from "@/server/mocks/monthlyData";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export type CalendarProps = {
  monthlyData: MonthlyData;
};
export default function Calendar({ monthlyData }: CalendarProps) {
  const currentDate = new Date();

  return (
    <CalendarStoreProvider
      initialValues={{
        currentDate,
        monthlyData,
      }}
    >
      <div className="rounded-lg border border-input p-6">
        <CalendarHeader />
        <div className="grid grid-cols-7 place-content-center place-items-center gap-1 lg:gap-2">
          {daysOfWeek.map((day) => (
            <span key={day}>{day}</span>
          ))}
          <CalendarContent />
        </div>
      </div>
    </CalendarStoreProvider>
  );
}
