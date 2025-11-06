import { Card, CardContent, Typography, Chip, Box, Stack } from '@mui/material';
import { Icon } from '@iconify/react';
import { Hall } from '../types';

interface HallCardProps {
  hall: Hall;
  onClick: () => void;
}

export function HallCard({ hall, onClick }: HallCardProps) {
  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
      onClick={onClick}
    >
      <CardContent>
        <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
          {hall.name}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'text.secondary' }}>
          <Icon icon="lucide:users" width={20} />
          <Typography variant="body2">
            Capacity: {hall.capacity} seats
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
          {hall.features.map((feature) => (
            <Chip key={feature} label={feature} size="small" color="primary" variant="outlined" />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}

