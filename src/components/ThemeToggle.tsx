import { Icon } from "@iconify/react";
import { useTheme } from "../theme";

export function ThemeToggle() {
  const { mode, palette, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      style={{
        position: "fixed",
        top: "1.5rem",
        right: "1.5rem",
        width: "3rem",
        height: "3rem",
        borderRadius: "50%",
        border: `2px solid ${palette.border.main}`,
        background: palette.background.elevated,
        color: palette.text.primary,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.5rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1) rotate(15deg)";
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1) rotate(0deg)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
      }}
      aria-label="Toggle theme"
    >
      <Icon
        icon={mode === "light" ? "lucide:moon" : "lucide:sun"}
        width={24}
        height={24}
      />
    </button>
  );
}
