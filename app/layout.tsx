import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cowabunga Experience Finder",
  description: "Find a Cowabunga Camp and build your perfect farm experience.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
