import { Icon } from "@iconify/react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { ShowtimeChip } from "../components/ShowtimeChip";
import { useData } from "../hooks/useData";
import { ShowtimeWithDetails } from "../types";
import { formatDate } from "../utils/dateUtils";
import {
  combineShowtimeData,
  filterShowtimesByMovie,
  filterUpcomingShowtimes,
  groupShowtimesByDate,
} from "../utils/showtimeUtils";

export function MovieDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { movies, halls, showtimes, loading } = useData();
  const [imgError, setImgError] = useState(false);

  const movie = useMemo(() => {
    return movies.find((m) => m.id === id);
  }, [movies, id]);

  const groupedShowtimes = useMemo(() => {
    if (!id) return new Map();

    const combined = combineShowtimeData(showtimes, movies, halls);
    const upcoming = filterUpcomingShowtimes(combined);
    const forMovie = filterShowtimesByMovie(upcoming, id);
    return groupShowtimesByDate(forMovie);
  }, [id, showtimes, movies, halls]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) {
    return <EmptyState message="Movie not found" icon="lucide:film-x" />;
  }

  return (
    <Box>
      <Button
        startIcon={<Icon icon="lucide:arrow-left" />}
        onClick={() => navigate("/")}
        sx={{ mb: 3 }}
      >
        Back to Movies
      </Button>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            gap: 4,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            component="img"
            src={imgError ? "/placeholder-movie.svg" : movie.coverImageUrl}
            alt={movie.title}
            onError={() => setImgError(true)}
            sx={{
              width: { xs: 1, md: 300 },
              height: { xs: "auto", md: 450 },
              objectFit: "cover",
              borderRadius: 2,
              bgcolor: "#2a2a2a",
            }}
          />

          <Box sx={{ flexGrow: 1 }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{ fontWeight: 700 }}
            >
              {movie.title}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Icon icon="lucide:user" width={20} />
              <Typography variant="subtitle1" color="text.secondary">
                Directed by {movie.director}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
              <Chip label={movie.genre} color="primary" />
              <Chip label={movie.rating} />
              <Chip
                icon={<Icon icon="lucide:clock" width={16} />}
                label={`${movie.duration} min`}
                variant="outlined"
              />
            </Box>

            <Typography variant="body1" color="text.secondary" paragraph>
              {movie.description}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Showtimes
      </Typography>

      {groupedShowtimes.size === 0 ? (
        <EmptyState message={`No showtimes available for ${movie.title}`} />
      ) : (
        <Stack spacing={3}>
          {Array.from(groupedShowtimes.entries()).map(([date, times]) => (
            <Paper key={date} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {formatDate(date)}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                {times.map((showtime: ShowtimeWithDetails) => (
                  <Box
                    key={showtime.id}
                    sx={{ display: "flex", alignItems: "center", gap: 2 }}
                  >
                    <ShowtimeChip time={showtime.startTime} />
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Icon icon="lucide:video" width={20} />
                      <Typography variant="body2" color="text.secondary">
                        {showtime.hall.name}
                      </Typography>
                    </Box>
                    {showtime.hall.features.length > 0 && (
                      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {showtime.hall.features.map((feature: string) => (
                          <Chip
                            key={feature}
                            label={feature}
                            size="small"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    )}
                  </Box>
                ))}
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}
