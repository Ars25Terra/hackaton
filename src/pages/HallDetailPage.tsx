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
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { ShowtimeChip } from "../components/ShowtimeChip";
import { useData } from "../hooks/useData";
import { ShowtimeWithDetails } from "../types";
import { formatDate, getDateRange } from "../utils/dateUtils";
import { getTranslatedHall } from "../utils/i18nData";
import {
  combineShowtimeData,
  filterShowtimesByHall,
  filterShowtimesInDateRange,
  filterUpcomingShowtimes,
  groupShowtimesByDate,
} from "../utils/showtimeUtils";

export function HallDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { movies, halls, showtimes, loading } = useData();

  const hall = useMemo(() => {
    const foundHall = halls.find((h) => h.id === id);
    return foundHall ? getTranslatedHall(foundHall, t) : undefined;
  }, [halls, id, t]);

  const groupedShowtimes = useMemo(() => {
    if (!id) return new Map();

    const dateRange = getDateRange(7);
    const startDate = dateRange[0];
    const endDate = dateRange[dateRange.length - 1];

    const combined = combineShowtimeData(showtimes, movies, halls);
    const upcoming = filterUpcomingShowtimes(combined);
    const inRange = filterShowtimesInDateRange(upcoming, startDate, endDate);
    const forHall = filterShowtimesByHall(inRange, id);
    return groupShowtimesByDate(forHall);
  }, [id, showtimes, movies, halls]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!hall) {
    return (
      <EmptyState message={t("halls.hallNotFound")} icon="lucide:video-off" />
    );
  }

  return (
    <Box>
      <Button
        startIcon={<Icon icon="lucide:arrow-left" />}
        onClick={() => navigate("/halls")}
        sx={{ mb: 3 }}
      >
        {t("halls.backToHalls")}
      </Button>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          {hall.name}
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          <Icon icon="lucide:users" width={24} />
          <Typography variant="h6" color="text.secondary">
            {t("halls.capacity", { count: hall.capacity })}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {hall.features.map((feature) => (
            <Chip key={feature} label={feature} color="primary" />
          ))}
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        {t("halls.schedule")}
      </Typography>

      {groupedShowtimes.size === 0 ? (
        <EmptyState message={t("halls.noSchedule", { name: hall.name })} />
      ) : (
        <Stack spacing={3}>
          {Array.from(groupedShowtimes.entries()).map(([date, times]) => (
            <Paper key={date} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {formatDate(date, i18n.language)}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                {times.map((showtime: ShowtimeWithDetails) => (
                  <Box
                    key={showtime.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      flexWrap: "wrap",
                    }}
                  >
                    <ShowtimeChip
                      time={showtime.startTime}
                      onClick={() => navigate(`/movie/${showtime.movieId}`)}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                        "&:hover": { textDecoration: "underline" },
                      }}
                      onClick={() => navigate(`/movie/${showtime.movieId}`)}
                    >
                      <Icon icon="lucide:film" width={20} />
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {showtime.movie.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {showtime.movie.genre} • {showtime.movie.duration} min
                    </Typography>
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
