import MobileNav from "@/features/layout/MobileNav";
import SideNav from "@/features/layout/SideNav";
import { validateRequest } from "@/server/auth/lucia";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function AuthenticatedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-screen-xl justify-center">
      <SideNav />

      <MobileNav />
      <main className="my-4 flex flex-1 flex-col items-center justify-center">
        {children}
      </main>
    </div>
  );
}
