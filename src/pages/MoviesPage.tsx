import { Icon } from "@iconify/react";
import {
  Box,
  Chip,
  CircularProgress,
  Grid,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";
import { EmptyState } from "../components/EmptyState";
import { MovieCard } from "../components/MovieCard";
import { MovieSearchFilter } from "../components/MovieSearchFilter";
import { useData } from "../hooks/useData";
import { getTranslatedMovie } from "../utils/i18nData";
import { filterMoviesBySearch, sortMovies } from "../utils/movieUtils";

type ViewMode = "grid" | "table";

export function MoviesPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { movies, loading } = useData();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const filteredAndSortedMovies = useMemo(() => {
    const translatedMovies = movies.map((movie) =>
      getTranslatedMovie(movie, t)
    );
    const filtered = filterMoviesBySearch(translatedMovies, searchQuery);
    return sortMovies(filtered);
  }, [movies, searchQuery, t]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          {t("movies.title")}
        </Typography>

        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, newMode) => newMode && setViewMode(newMode)}
          size="small"
        >
          <ToggleButton value="grid" aria-label="grid view">
            <Icon icon="lucide:grid-3x3" width={20} />
          </ToggleButton>
          <ToggleButton value="table" aria-label="table view">
            <Icon icon="lucide:table" width={20} />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <MovieSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {filteredAndSortedMovies.length === 0 ? (
        <EmptyState
          message={
            searchQuery
              ? t("movies.noResults", { query: searchQuery })
              : t("movies.noMovies")
          }
          icon="lucide:film"
        />
      ) : (
        <>
          {searchQuery && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t("movies.found", { count: filteredAndSortedMovies.length })}
            </Typography>
          )}

          {viewMode === "grid" ? (
            <Grid container spacing={3}>
              {filteredAndSortedMovies.map((movie) => (
                <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                  <MovieCard
                    movie={movie}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper sx={{ overflow: "hidden" }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                  gap: 2,
                  p: 2,
                  bgcolor: "background.default",
                  fontWeight: 600,
                  borderBottom: 1,
                  borderColor: "border.main",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {t("table.title")}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {t("table.genre")}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {t("table.duration")}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {t("table.rating")}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {t("table.director")}
                </Typography>
              </Box>
              <Virtuoso
                style={{ height: "600px" }}
                totalCount={filteredAndSortedMovies.length}
                itemContent={(index) => {
                  const movie = filteredAndSortedMovies[index];
                  return (
                    <Box
                      onClick={() => navigate(`/movie/${movie.id}`)}
                      sx={{
                        display: "grid",
                        gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
                        gap: 2,
                        p: 2,
                        cursor: "pointer",
                        borderBottom: 1,
                        borderColor: "border.light",
                        transition: "background-color 0.2s",
                        "&:hover": {
                          bgcolor: "action.hover",
                        },
                      }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {movie.title}
                      </Typography>
                      <Chip
                        label={movie.genre}
                        size="small"
                        sx={{ width: "fit-content" }}
                      />
                      <Typography variant="body2" color="text.secondary">
                        {movie.duration} min
                      </Typography>
                      <Chip label={movie.rating} size="small" />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {movie.director}
                      </Typography>
                    </Box>
                  );
                }}
              />
            </Paper>
          )}
        </>
      )}
    </Box>
  );
}
