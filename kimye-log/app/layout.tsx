import type { Metadata } from "next";
import "./globals.css";
import MainHeader from "@/components/main-header/main-header";
import ThemeProviders from "./ThemeProvider";

export const metadata: Metadata = {
  title: "Kimye0808's blog",
  description: "Software Engineer Kimye0808's Development Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body>
        <ThemeProviders>
          <MainHeader />
          {children}
        </ThemeProviders>
      </body>
    </html>
  );
}
