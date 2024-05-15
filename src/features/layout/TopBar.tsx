"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export type TopBarProps = {
  backTo?: string;
};
export const TopBar = ({ backTo }: TopBarProps) => {
  const router = useRouter();

  return (
    <div className="flex w-full items-center justify-start">
      {!!backTo && (
        <Button
          onClick={() => router.push(backTo)}
          className="mr-4"
          variant="secondary"
        >
          <ArrowLeft className="mr-1 size-4" />
          <Calendar className="mr-1 size-4" /> Back
        </Button>
      )}
    </div>
  );
};
