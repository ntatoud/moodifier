"use client";
import { Calendar, Settings } from "lucide-react";

export const NavItems = [
  {
    name: "Calendar",
    href: "/",
    Icon: Calendar,
  },
  {
    name: "Settings",
    href: "/settings",
    Icon: Settings,
  },
] as const;

export type NavItem = (typeof NavItems)[number];
