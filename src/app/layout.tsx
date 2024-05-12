import "@/styles/globals.css";

import { Poppins, Quicksand } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import SideNav from "@/features/layout/SideNav";
import MobileNav from "@/features/layout/MobileNav";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

const headingFont = Poppins({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["700"],
});

const defaultFont = Quicksand({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "Moodifier",
  icons: [{ rel: "icon", url: "/logo-moodifier.png" }],
  manifest: "/webmanifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(headingFont.variable, defaultFont.variable)}>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <TRPCReactProvider>
          <div className="mx-auto flex min-h-screen w-full max-w-screen-xl justify-center">
            <SideNav />

            <MobileNav />
            <main className="my-4 flex flex-1 flex-col items-center justify-center">
              {children}
            </main>
          </div>
          <Toaster position="top-right" richColors />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
