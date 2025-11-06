import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { formatDate, getDateRange, isDateToday } from "../utils/dateUtils";

interface DateFilterProps {
  selectedDate: string | null;
  onChange: (date: string | null) => void;
}

export function DateFilter({ selectedDate, onChange }: DateFilterProps) {
  const { t, i18n } = useTranslation();
  const dates = useMemo(() => getDateRange(7), []);

  return (
    <ToggleButtonGroup
      value={selectedDate || "all"}
      exclusive
      onChange={(_, value) => onChange(value === "all" ? null : value)}
      aria-label="date filter"
      sx={{
        flexWrap: "wrap",
        gap: 1,
        "& .MuiToggleButton-root": {
          border: 1,
          borderRadius: 2,
          px: 2,
          py: 1,
        },
      }}
    >
      <ToggleButton value="all" aria-label="all dates">
        {t("schedule.allDates")}
      </ToggleButton>
      {dates.map((date) => (
        <ToggleButton key={date} value={date} aria-label={date}>
          {isDateToday(date)
            ? t("schedule.today")
            : formatDate(date, i18n.language)}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
