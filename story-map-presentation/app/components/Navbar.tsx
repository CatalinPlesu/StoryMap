"use client"; // Ensures this runs on the client-side

import { useState, useEffect } from "react";

export default function Navbar() {
  // State to track the current theme
  const [isDark, setIsDark] = useState(false);

  // Update theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    } else if (savedTheme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      // Fallback to system theme preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(systemTheme);
      document.documentElement.classList.toggle("dark", systemTheme);
    }
  }, []);

  // Toggle the theme
  const toggleTheme = () => {
    setIsDark((prev) => {
      const newTheme = !prev;
      // Update the <html> element class
      if (newTheme) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return newTheme;
    });
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center space-x-4">
        <button
          className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md text-sm font-semibold"
          onClick={() => window.history.length > 1 ? window.history.back() : window.location.href = "/"}
        >
          ← Back
        </button>
        <h1
          className="cursor-pointer text-xl font-bold"
          onClick={() => window.location.href = "/"} // Navigate to the home page
        >
          My App
        </h1>
      </div>
      <button
        className="p-2 bg-gray-200 dark:bg-gray-700 rounded-md"
        onClick={toggleTheme} // Theme toggle button
      >
        Toggle Theme
      </button>
    </header>
  );
}
