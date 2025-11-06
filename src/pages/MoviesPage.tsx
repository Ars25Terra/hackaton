import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, CircularProgress } from '@mui/material';
import { useData } from '../hooks/useData';
import { MovieCard } from '../components/MovieCard';
import { EmptyState } from '../components/EmptyState';

export function MoviesPage() {
  const navigate = useNavigate();
  const { movies, loading } = useData();

  const sortedMovies = useMemo(() => {
    return [...movies].sort((a, b) => a.title.localeCompare(b.title));
  }, [movies]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (sortedMovies.length === 0) {
    return <EmptyState message="No movies available" icon="lucide:film" />;
  }

  return (
    <Grid container spacing={3}>
      {sortedMovies.map((movie) => (
        <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
          <MovieCard
            movie={movie}
            onClick={() => navigate(`/movie/${movie.id}`)}
          />
        </Grid>
      ))}
    </Grid>
  );
}

