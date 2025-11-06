import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Stack,
  Divider,
  Chip,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useData } from '../hooks/useData';
import {
  combineShowtimeData,
  filterUpcomingShowtimes,
  filterShowtimesByDate,
  groupShowtimesByDate,
} from '../utils/showtimeUtils';
import { formatDate } from '../utils/dateUtils';
import { ShowtimeChip } from '../components/ShowtimeChip';
import { EmptyState } from '../components/EmptyState';
import { DateFilter } from '../components/DateFilter';

export function SchedulePage() {
  const navigate = useNavigate();
  const { movies, halls, showtimes, loading } = useData();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const groupedShowtimes = useMemo(() => {
    const combined = combineShowtimeData(showtimes, movies, halls);
    const upcoming = filterUpcomingShowtimes(combined);
    const filtered = selectedDate
      ? filterShowtimesByDate(upcoming, selectedDate)
      : upcoming;
    return groupShowtimesByDate(filtered);
  }, [showtimes, movies, halls, selectedDate]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        Complete Schedule
      </Typography>

      <Box sx={{ mb: 4 }}>
        <DateFilter selectedDate={selectedDate} onChange={setSelectedDate} />
      </Box>

      {groupedShowtimes.size === 0 ? (
        <EmptyState
          message={
            selectedDate
              ? `No showtimes available for ${formatDate(selectedDate)}`
              : 'No showtimes available'
          }
        />
      ) : (
        <Stack spacing={3}>
          {Array.from(groupedShowtimes.entries()).map(([date, times]) => (
            <Paper key={date} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                {formatDate(date)}
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Stack spacing={2}>
                {times.map((showtime) => (
                  <Box
                    key={showtime.id}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      flexWrap: 'wrap',
                      p: 2,
                      borderRadius: 1,
                      bgcolor: 'background.default',
                    }}
                  >
                    <ShowtimeChip time={showtime.startTime} />
                    
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
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
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                      onClick={() => navigate(`/hall/${showtime.hallId}`)}
                    >
                      <Icon icon="lucide:video" width={20} />
                      <Typography variant="body2" color="text.secondary">
                        {showtime.hall.name}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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

