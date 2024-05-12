"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Header() {
  const router = useRouter();
  const logout = api.auth.logout.useMutation({
    onSuccess: () => {
      toast.success("Logged out successfully");
      router.refresh();
    },
    onError: () => {
      toast.error("Failed to log out");
    },
  });
  return (
    <header className="flex w-full items-center justify-between p-4">
      <Button
        onClick={() => logout.mutate()}
        isLoading={logout.isPending}
        disabled={logout.isPending}
      >
        Log out
      </Button>
    </header>
  );
}
