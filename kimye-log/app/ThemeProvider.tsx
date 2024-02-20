"use client";
import { useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";

const ThemeProviders = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient && <ThemeProvider>{children}</ThemeProvider>;
};

export default ThemeProviders;
