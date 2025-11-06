import { Box, CircularProgress, Grid, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from '../components/EmptyState';
import { MovieCard } from '../components/MovieCard';
import { MovieSearchFilter } from '../components/MovieSearchFilter';
import { useData } from '../hooks/useData';
import { filterMoviesBySearch, sortMovies } from '../utils/movieUtils';

export function MoviesPage() {
  const navigate = useNavigate();
  const { movies, loading } = useData();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedMovies = useMemo(() => {
    const filtered = filterMoviesBySearch(movies, searchQuery);
    return sortMovies(filtered);
  }, [movies, searchQuery]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Movies
      </Typography>

      <MovieSearchFilter searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {filteredAndSortedMovies.length === 0 ? (
        <EmptyState 
          message={
            searchQuery 
              ? `No movies found for "${searchQuery}"` 
              : "No movies available"
          } 
          icon="lucide:film" 
        />
      ) : (
        <>
          {searchQuery && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Found {filteredAndSortedMovies.length} {filteredAndSortedMovies.length === 1 ? 'movie' : 'movies'}
            </Typography>
          )}
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
        </>
      )}
    </Box>
  );
}

