import { ReactNode, createContext, useContext, useState } from "react";
import { Palette, ThemeMode, darkPalette, lightPalette } from "./palette";
import { applyThemeToDocument } from "./utils";

interface ThemeContextValue {
  mode: ThemeMode;
  palette: Palette;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

const getInitialTheme = (): ThemeMode => {
  const saved = localStorage.getItem("theme-mode");
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  return "dark";
};

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const initialMode = getInitialTheme();
    applyThemeToDocument(
      initialMode === "dark" ? darkPalette : lightPalette,
      initialMode
    );
    return initialMode;
  });

  const palette = mode === "dark" ? darkPalette : lightPalette;

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      const newPalette = newMode === "dark" ? darkPalette : lightPalette;
      localStorage.setItem("theme-mode", newMode);
      applyThemeToDocument(newPalette, newMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ mode, palette, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
