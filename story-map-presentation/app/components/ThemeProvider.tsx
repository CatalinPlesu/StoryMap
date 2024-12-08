"use client"; 

import { useEffect } from "react";

export default function ThemeProvider() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
    } else {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
      document.documentElement.classList.add(systemTheme);
    }
  }, []);

  return null;
}
