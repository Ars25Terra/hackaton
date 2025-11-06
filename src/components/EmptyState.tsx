import { Box, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

interface EmptyStateProps {
  message: string;
  icon?: string;
}

export function EmptyState({ message, icon = 'lucide:calendar-x' }: EmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
      }}
    >
      <Icon icon={icon} width={64} height={64} style={{ opacity: 0.3, marginBottom: 16 }} />
      <Typography variant="h6" color="text.secondary" textAlign="center">
        {message}
      </Typography>
    </Box>
  );
}

