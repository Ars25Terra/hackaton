import { Chip } from '@mui/material';

interface ShowtimeChipProps {
  time: string;
  onClick?: () => void;
}

export function ShowtimeChip({ time, onClick }: ShowtimeChipProps) {
  return (
    <Chip
      label={time}
      variant="outlined"
      onClick={onClick}
      sx={{
        fontWeight: 600,
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          bgcolor: 'primary.light',
          color: 'primary.contrastText',
        } : {},
      }}
    />
  );
}

