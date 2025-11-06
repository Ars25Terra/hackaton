import { Icon } from "@iconify/react";
import { Box, InputAdornment, TextField } from "@mui/material";

interface MovieSearchFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function MovieSearchFilter({
  searchQuery,
  onSearchChange,
}: MovieSearchFilterProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <TextField
        fullWidth
        placeholder="Search by title, genre, or director..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon icon="lucide:search" width={20} />
            </InputAdornment>
          ),
          ...(searchQuery && {
            endAdornment: (
              <InputAdornment position="end">
                <Box
                  onClick={() => onSearchChange("")}
                  sx={{
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    color: "text.secondary",
                    "&:hover": { color: "text.primary" },
                  }}
                >
                  <Icon icon="lucide:x" width={20} />
                </Box>
              </InputAdornment>
            ),
          }),
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
          },
        }}
      />
    </Box>
  );
}

