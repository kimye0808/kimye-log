import "./globals.css";
import type { Metadata } from "next";
import MainHeader from "@/components/main-header/main-header";
import ThemeProviders from "./ThemeProvider";
import SessionProviders from "./SessionProvider";

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
    <html
      lang="en"
      className="light"
      style={{ colorScheme: "light" }}
      data-color-mode="light"
    >
      <body>
        <SessionProviders>
          <ThemeProviders>
            <MainHeader />
            {children}
          </ThemeProviders>
        </SessionProviders>
      </body>
    </html>
  );
}
