"use client";

import { NavItems } from "./config";
import { MobileNavItem } from "./NavItem";
export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0  w-screen bg-white shadow-[0_0.1rem_0.5rem_0.1rem_rgba(0,0,0,0.2)] md:hidden">
      <ul className="flex justify-around p-4">
        {NavItems.map((item) => (
          <li key={`mobile-nav-item-${item.href}`}>
            <MobileNavItem {...item} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
