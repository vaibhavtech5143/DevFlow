
"use client"
import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
  handleThemeChange: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState("");

  const handleThemeChange = () => {
    if (mode === "light") {
      setMode("dark");
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark"); // Update local storage
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light"); // Update local storage
    }
  };

  

  useEffect(() => {
    // Set the initial theme based on local storage or system preference
    const savedMode = localStorage.getItem("theme");
    if (savedMode) {
      setMode(savedMode);
      document.documentElement.classList.toggle("dark", savedMode === "dark");
    } else {
      const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setMode(prefersDarkMode ? "dark" : "light");
    }
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) throw new Error("Missing Theme Provider");
  return context;
}
