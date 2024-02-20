"use client";
import classes from "./theme-button.module.css";
import { useTheme } from "next-themes";
import { MdWbSunny } from "react-icons/md";
import { IoMoon } from "react-icons/io5";
import { useEffect, useState } from "react";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  /**
   * mounte가 되야만 버튼이 보일 수 있도록 함 -> hydration mistmatch방지
   */
  if (!mounted) {
    return null;
  }
  return (
    <>
      <button
        className={classes.btn}
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <MdWbSunny color="orange" size={21} />
        ) : (
          <IoMoon color="blue" size={21} />
        )}
      </button>
    </>
  );
}
