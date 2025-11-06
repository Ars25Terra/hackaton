import { useMemo } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { getDateRange, formatDate, isDateToday } from '../utils/dateUtils';

interface DateFilterProps {
  selectedDate: string | null;
  onChange: (date: string | null) => void;
}

export function DateFilter({ selectedDate, onChange }: DateFilterProps) {
  const dates = useMemo(() => getDateRange(7), []);

  return (
    <ToggleButtonGroup
      value={selectedDate}
      exclusive
      onChange={(_, value) => onChange(value)}
      aria-label="date filter"
      sx={{
        flexWrap: 'wrap',
        gap: 1,
        '& .MuiToggleButton-root': {
          border: 1,
          borderRadius: 2,
          px: 2,
          py: 1,
        },
      }}
    >
      <ToggleButton value={null} aria-label="all dates">
        All Dates
      </ToggleButton>
      {dates.map((date) => (
        <ToggleButton key={date} value={date} aria-label={date}>
          {isDateToday(date) ? 'Today' : formatDate(date)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}

