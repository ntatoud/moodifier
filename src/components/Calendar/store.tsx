import { createStore, type StoreApi, useStore } from "zustand";

import { createContext, type ReactNode, useContext, useState } from "react";
import { addMonths, subMonths } from "date-fns";
import type { MonthlyData } from "@/server/mocks/monthlyData";

const CalendarStoreContext = createContext<StoreApi<CalendarStore> | null>(
  null,
);

type CalendarStore = {
  currentDate: Date;
  monthlyData: MonthlyData;
  actions: {
    setCurrentDate: (date: Date) => void;
    nextMonth: () => void;
    prevMonth: () => void;
  };
};

export const CalendarStoreProvider = ({
  children,
  initialValues,
}: {
  children: ReactNode;
  initialValues: {
    currentDate: Date;
    monthlyData: MonthlyData;
  };
}) => {
  const [store] = useState(() =>
    createStore<CalendarStore>((set) => ({
      currentDate: initialValues.currentDate,
      monthlyData: initialValues.monthlyData,
      actions: {
        setCurrentDate: (date: Date) => set({ currentDate: date }),
        nextMonth: () =>
          set((state) => ({ currentDate: addMonths(state.currentDate, 1) })),
        prevMonth: () =>
          set((state) => ({ currentDate: subMonths(state.currentDate, 1) })),
      },
    })),
  );

  return (
    <CalendarStoreContext.Provider value={store}>
      {children}
    </CalendarStoreContext.Provider>
  );
};

const useCalendarStore = <T,>(selector: (state: CalendarStore) => T): T => {
  const store = useContext(CalendarStoreContext);
  if (!store) {
    throw new Error("Missing CalendarStoreProvider");
  }

  return useStore(store, selector);
};

export const useCurrentDate = () =>
  useCalendarStore((state) => state.currentDate);
export const useMonthlyData = () =>
  useCalendarStore((state) => state.monthlyData);
export const useCalendarActions = () =>
  useCalendarStore((state) => state.actions);
