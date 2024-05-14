"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavItem } from "./config";

export function SideNavItem({ name, href, Icon }: NavItem) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex w-full items-center rounded-md px-3 py-2 hover:bg-gray-200 dark:hover:bg-gray-800",
        {
          "border-r-4 border-primary/50 bg-gray-200 font-bold text-primary dark:bg-gray-800":
            pathname === href,
        },
      )}
    >
      <Icon className="mr-1 size-6" />
      {name}
    </Link>
  );
}

export function MobileNavItem({ name, href, Icon }: NavItem) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn("flex flex-col items-center text-muted-foreground", {
        "text-primary": pathname === href,
      })}
    >
      <Icon className={cn("mr-1 size-6", { "size-7": pathname === href })} />
      {name}
    </Link>
  );
}
