import {
  AppBar,
  Box,
  Container,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from "@mui/material";
import { ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { ThemeToggle } from "../components/ThemeToggle";

interface MainLayoutProps {
  children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const { t } = useTranslation();

  const currentTab = useMemo(() => {
    const path = location.pathname;
    if (path.startsWith("/halls")) return "/halls";
    if (path.startsWith("/schedule")) return "/schedule";
    return "/";
  }, [location.pathname]);

  return (
    <Box sx={{ minHeight: 1 }}>
      <AppBar position="static" elevation={2}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, fontWeight: 600 }}
          >
            Arseny's Cinema finder
          </Typography>
          <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
            <LanguageSwitcher />
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
        }}
      >
        <Container maxWidth="lg">
          <Tabs value={currentTab} aria-label="cinema navigation">
            <Tab label={t("nav.movies")} value="/" component={Link} to="/" />
            <Tab
              label={t("nav.halls")}
              value="/halls"
              component={Link}
              to="/halls"
            />
            <Tab
              label={t("nav.schedule")}
              value="/schedule"
              component={Link}
              to="/schedule"
            />
          </Tabs>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {children}
      </Container>
    </Box>
  );
}
