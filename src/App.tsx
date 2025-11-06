import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useTheme, createMuiTheme } from "./theme";
import { MainLayout } from "./layouts/MainLayout";
import { MoviesPage } from "./pages/MoviesPage";
import { MovieDetailPage } from "./pages/MovieDetailPage";
import { HallsPage } from "./pages/HallsPage";
import { HallDetailPage } from "./pages/HallDetailPage";
import { SchedulePage } from "./pages/SchedulePage";

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
