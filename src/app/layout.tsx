import "@/styles/globals.css";

import { Poppins, Quicksand } from "next/font/google";

import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";

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

export const metadata = {
  title: "Moodifier",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(headingFont.variable, defaultFont.variable)}>
      <body className="flex min-h-screen flex-col">
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
