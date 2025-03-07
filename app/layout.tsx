import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Provider as JotaiProvider } from "jotai";
import Notifications from "./(components)/notification";

export const metadata = {
  title: "Zen Fit",
  description: "Track and Grow - Simple",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <JotaiProvider>
        <html lang="en">
          <body className="overflow-hidden w-screen bg-neutral-200 h-dvh dark:bg-neutral-950">
            <Notifications />
            {children}
          </body>
        </html>
      </JotaiProvider>
    </ClerkProvider>
  );
}
