import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HallDetailPage } from "./pages/HallDetailPage";
import { HallsPage } from "./pages/HallsPage";
import { MovieDetailPage } from "./pages/MovieDetailPage";
import { MoviesPage } from "./pages/MoviesPage";
import { SchedulePage } from "./pages/SchedulePage";
import { createMuiTheme, useTheme } from "./theme";

function AppContent() {
  const { palette, mode } = useTheme();
  const muiTheme = createMuiTheme(palette, mode);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<MoviesPage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/halls" element={<HallsPage />} />
            <Route path="/hall/:id" element={<HallDetailPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
          </Routes>
        </MainLayout>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default AppContent;
