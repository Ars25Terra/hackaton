import { Icon } from "@iconify/react";
import { IconButton } from "@mui/material";
import { useTheme } from "../theme";

export function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();

  return (
    <IconButton
      onClick={toggleTheme}
      color="inherit"
      size="large"
      aria-label="Toggle theme"
    >
      <Icon
        icon={mode === "light" ? "lucide:moon" : "lucide:sun"}
        width={24}
        height={24}
      />
    </IconButton>
  );
}
