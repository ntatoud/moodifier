"use client";

import { MoreHorizontal } from "lucide-react";
import { NavItems } from "./config";
import { MobileNavItem } from "./NavItem";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import UserActions from "../userActions/UserActions";

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0  w-screen bg-background shadow-[0_0.1rem_0.5rem_0.1rem_rgba(0,0,0,0.2)] dark:shadow-[0_0.1rem_0.5rem_0.1rem_rgba(255,255,255,0.4)] md:hidden">
      <ul className="flex justify-around p-4">
        {NavItems.map((item) => (
          <li key={`mobile-nav-item-${item.href}`}>
            <MobileNavItem {...item} />
          </li>
        ))}
        <li key="mobile-nav-item-more">
          <Drawer>
            <DrawerTrigger asChild>
              <div className="flex flex-col items-center text-muted-foreground">
                <MoreHorizontal className="mr-1 size-6" />
                More
              </div>
            </DrawerTrigger>
            <DrawerContent className="min-h-80 focus:outline-none">
              <div className="mx-auto my-auto w-full max-w-sm">
                <DrawerHeader>
                  <DrawerTitle>Your opinion matters</DrawerTitle>
                  <DrawerDescription>
                    Take part in the growth of this app!
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4">
                  <div className="flex items-center justify-center space-x-2">
                    <UserActions />
                  </div>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </li>
      </ul>
    </nav>
  );
}
