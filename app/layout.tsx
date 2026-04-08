import "./globals.css";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Wall Calendar Range Picker",
  description: "A tactile, wall-calendar inspired date range picker with notes."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className="m-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.94),transparent_42%),linear-gradient(180deg,#eeebe5_0%,#ddd6cb_100%)] text-[#13253a]"
      >
        {children}
      </body>
    </html>
  );
}
