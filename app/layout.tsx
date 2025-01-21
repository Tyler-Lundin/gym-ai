import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Provider as JotaiProvider } from "jotai";

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
          <body className="bg-black">{children}</body>
        </html>
      </JotaiProvider>
    </ClerkProvider>
  );
}
