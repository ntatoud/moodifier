"use client";
import { NavItems } from "./config";
import { SideNavItem } from "./NavItem";
import UserActions from "../userActions/UserActions";

export default function SideNav() {
  return (
    <nav className="hidden w-48 flex-col border-r-2 border-input bg-background p-4 md:flex">
      <h2 className="font-heading text-3xl font-bold">Moodifier</h2>
      <ul className="flex h-full flex-col gap-2 py-8 text-lg">
        {NavItems.map((item) => (
          <li key={`side-nav-item-${item.href}`}>
            <SideNavItem {...item} />
          </li>
        ))}
      </ul>
      <UserActions />
    </nav>
  );
}
