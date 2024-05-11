"use client";
import { NavItems } from "./config";
import { SideNavItem } from "./NavItem";

export default function SideNav() {
  return (
    <nav className="hidden w-48 border-r-2 border-input bg-white p-4 md:block">
      <h2 className="font-heading text-3xl font-bold">Moodifier</h2>
      <ul className="flex flex-col gap-2 py-8 text-lg">
        {NavItems.map((item) => (
          <li key={`side-nav-item-${item.href}`}>
            <SideNavItem {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
