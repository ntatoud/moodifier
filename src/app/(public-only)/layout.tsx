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

  return (
    <div className="flex  w-screen flex-1 flex-col lg:flex-row">
      <div className="flex h-[80vh] w-full flex-col items-center justify-center lg:h-screen lg:w-2/5">
        <div className="w-full max-w-sm space-x-1 space-y-10 px-4 text-left lg:w-[30vw]">
          {children}
        </div>
      </div>
      <div className="flex w-full flex-1 items-center justify-center bg-primary lg:w-3/5">
        <aside className=" text-center font-heading text-5xl text-white">
          <div>Moodifier</div>
        </aside>
      </div>
    </div>
  );
}
