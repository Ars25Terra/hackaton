import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, CircularProgress } from '@mui/material';
import { useData } from '../hooks/useData';
import { HallCard } from '../components/HallCard';
import { EmptyState } from '../components/EmptyState';

export function HallsPage() {
  const navigate = useNavigate();
  const { halls, loading } = useData();

  const sortedHalls = useMemo(() => {
    return [...halls].sort((a, b) => a.name.localeCompare(b.name));
  }, [halls]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (sortedHalls.length === 0) {
    return <EmptyState message="No halls available" icon="lucide:video" />;
  }

  return (
    <Grid container spacing={3}>
      {sortedHalls.map((hall) => (
        <Grid item key={hall.id} xs={12} sm={6} md={4}>
          <HallCard
            hall={hall}
            onClick={() => navigate(`/hall/${hall.id}`)}
          />
        </Grid>
      ))}
    </Grid>
  );
}

