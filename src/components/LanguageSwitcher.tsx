import { Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem("language", langCode);
    handleClose();
  };

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  return (
    <Box>
      <IconButton
        onClick={handleClick}
        color="inherit"
        size="large"
        sx={{
          fontSize: "1.5rem",
          minWidth: 48,
        }}
      >
        {currentLanguage?.flag || "🇬🇧"}
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            selected={lang.code === i18n.language}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
