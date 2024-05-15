"use client";

import Calendar from "@/components/Calendar";
import { FullLoader } from "@/components/FullLoader";
import { api } from "@/trpc/react";

export default function Home() {
  const notesData = api.notes.getAll.useQuery(); // todo add pagination

  if (notesData.isPending) {
    return <FullLoader />;
  }
  const monthlyData =
    notesData.data?.notes.reduce((acc, note) => {
      return {
        ...acc,
        [note.date]: {
          mood: note.mood,
        },
      };
    }, {}) ?? {};

  return <Calendar monthlyData={monthlyData} />;
}
