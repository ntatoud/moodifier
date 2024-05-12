import { validateRequest } from "@/server/auth/lucia";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function PublicOnlyLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = await validateRequest();

  if (user) {
    redirect("/");
  }

  return <>{children}</>;
}
