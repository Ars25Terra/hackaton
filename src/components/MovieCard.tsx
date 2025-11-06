import { Card, CardMedia, CardContent, Typography, Chip, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onClick: () => void;
}

export function MovieCard({ movie, onClick }: MovieCardProps) {
  return (
    <Card
      sx={{
        height: 1,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6,
        },
      }}
      onClick={onClick}
    >
      <CardMedia
        component="img"
        height={360}
        image={movie.coverImageUrl}
        alt={movie.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600 }}>
          {movie.title}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
          <Chip label={movie.genre} size="small" color="primary" variant="outlined" />
          <Chip label={movie.rating} size="small" />
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
          <Icon icon="lucide:clock" width={16} />
          <Typography variant="body2">
            {movie.duration} min
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

