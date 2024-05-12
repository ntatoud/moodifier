"use client";

import { Button } from "@/components/ui/button";
import { monthlyData } from "@/server/mocks/monthlyData";
import { ArrowLeft, Calendar } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function PageNotes() {
  const params = useParams();
  const router = useRouter();
  const date = params.date?.toString() ?? "";
  const note = monthlyData[date]?.note;
  return (
    <div className="flex w-full flex-1 flex-col px-4 md:px-20">
      <div className="flex w-full items-center justify-start">
        <Button
          onClick={() => router.push("/")}
          className="mr-4"
          variant="secondary"
        >
          <ArrowLeft className="mr-1 size-4" />
          <Calendar className="mr-1 size-4" /> Back
        </Button>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center">
        <h1>Notes</h1>
        {note}
      </div>
    </div>
  );
}
