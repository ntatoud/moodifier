"use client";

import { ColorModeToggle } from "@/components/ColorModeToggle";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PageSettings() {
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
    <>
      <h1 className="font-heading text-3xl leading-loose tracking-tight">
        Settings
      </h1>
      <Button
        onClick={() => logout.mutate()}
        variant="outline"
        className="text-destructive dark:text-red-500"
        isLoading={logout.isPending}
        disabled={logout.isPending}
      >
        Log Out
        <LogOut className="ml-1 size-4" />
      </Button>
      <ColorModeToggle />
    </>
  );
}
