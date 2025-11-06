import { Icon } from "@iconify/react";
import {
  Box,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { DateFilter } from "../components/DateFilter";
import { EmptyState } from "../components/EmptyState";
import { ShowtimeChip } from "../components/ShowtimeChip";
import { useData } from "../hooks/useData";
import { formatDate } from "../utils/dateUtils";
import { getTranslatedHall, getTranslatedMovie } from "../utils/i18nData";
import {
  combineShowtimeData,
  filterShowtimesByDate,
  filterUpcomingShowtimes,
  groupShowtimesByDate,
} from "../utils/showtimeUtils";

export function SchedulePage() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { movies, halls, showtimes, loading } = useData();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const groupedShowtimes = useMemo(() => {
    const translatedMovies = movies.map((m) => getTranslatedMovie(m, t));
    const translatedHalls = halls.map((h) => getTranslatedHall(h, t));
    const combined = combineShowtimeData(
      showtimes,
      translatedMovies,
      translatedHalls
    );
    const upcoming = filterUpcomingShowtimes(combined);
    const filtered = selectedDate
      ? filterShowtimesByDate(upcoming, selectedDate)
      : upcoming;
    return groupShowtimesByDate(filtered);
  }, [showtimes, movies, halls, selectedDate, t]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        {t("schedule.title")}
      </Typography>

      <Box sx={{ mb: 4 }}>
        <DateFilter selectedDate={selectedDate} onChange={setSelectedDate} />
      </Box>

      {groupedShowtimes.size === 0 ? (
        <EmptyState
          message={
            selectedDate
              ? t("schedule.noScheduleForDate", {
                  date: formatDate(selectedDate, i18n.language),
                })
              : t("schedule.noSchedule")
          }
        />
      ) : (
        <Stack spacing={3}>
          {Array.from(groupedShowtimes.entries()).map(([date, times]) => (
            <Paper key={date} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                {formatDate(date, i18n.language)}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                {times.map((showtime) => (
                  <Box
                    key={showtime.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      flexWrap: "wrap",
                      p: 2,
                      borderRadius: 1,
                      bgcolor: "background.default",
                    }}
                  >
                    <ShowtimeChip time={showtime.startTime} />

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
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {showtime.movie.title}
                      </Typography>
                    </Box>

                    <Chip label={showtime.movie.genre} size="small" />

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        cursor: "pointer",
                        "&:hover": { textDecoration: "underline" },
                      }}
                      onClick={() => navigate(`/hall/${showtime.hallId}`)}
                    >
                      <Icon icon="lucide:video" width={20} />
                      <Typography variant="body2" color="text.secondary">
                        {showtime.hall.name}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Icon icon="lucide:clock" width={16} />
                      <Typography variant="body2" color="text.secondary">
                        {showtime.movie.duration} min
                      </Typography>
                    </Box>
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
