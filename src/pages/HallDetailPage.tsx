import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Chip,
  Paper,
  Button,
  CircularProgress,
  Divider,
  Stack,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useData } from '../hooks/useData';
import { combineShowtimeData, filterUpcomingShowtimes, filterShowtimesByHall, groupShowtimesByDate } from '../utils/showtimeUtils';
import { formatDate } from '../utils/dateUtils';
import { ShowtimeChip } from '../components/ShowtimeChip';
import { EmptyState } from '../components/EmptyState';

export function HallDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { movies, halls, showtimes, loading } = useData();

  const hall = useMemo(() => {
    return halls.find(h => h.id === id);
  }, [halls, id]);

  const groupedShowtimes = useMemo(() => {
    if (!id) return new Map();
    
    const combined = combineShowtimeData(showtimes, movies, halls);
    const upcoming = filterUpcomingShowtimes(combined);
    const forHall = filterShowtimesByHall(upcoming, id);
    return groupShowtimesByDate(forHall);
  }, [id, showtimes, movies, halls]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!hall) {
    return <EmptyState message="Hall not found" icon="lucide:video-off" />;
  }

  return (
    <Box>
      <Button
        startIcon={<Icon icon="lucide:arrow-left" />}
        onClick={() => navigate('/halls')}
        sx={{ mb: 3 }}
      >
        Back to Halls
      </Button>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          {hall.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Icon icon="lucide:users" width={24} />
          <Typography variant="h6" color="text.secondary">
            Capacity: {hall.capacity} seats
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {hall.features.map((feature) => (
            <Chip key={feature} label={feature} color="primary" />
          ))}
        </Box>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Schedule
      </Typography>

      {groupedShowtimes.size === 0 ? (
        <EmptyState message={`No showtimes available for ${hall.name}`} />
      ) : (
        <Stack spacing={3}>
          {Array.from(groupedShowtimes.entries()).map(([date, times]) => (
            <Paper key={date} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
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
                    }}
                  >
                    <ShowtimeChip
                      time={showtime.startTime}
                      onClick={() => navigate(`/movie/${showtime.movieId}`)}
                    />
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

