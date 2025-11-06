import { Box, CircularProgress, Grid } from "@mui/material";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";
import { HallCard } from "../components/HallCard";
import { useData } from "../hooks/useData";
import { getTranslatedHall } from "../utils/i18nData";

export function HallsPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { halls, loading } = useData();

  const sortedHalls = useMemo(() => {
    const translatedHalls = halls.map((hall) => getTranslatedHall(hall, t));
    return [...translatedHalls].sort((a, b) => a.name.localeCompare(b.name));
  }, [halls, t]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (sortedHalls.length === 0) {
    return <EmptyState message={t("halls.noHalls")} icon="lucide:video" />;
  }

  return (
    <Grid container spacing={3}>
      {sortedHalls.map((hall) => (
        <Grid item key={hall.id} xs={12} sm={6} md={4}>
          <HallCard hall={hall} onClick={() => navigate(`/hall/${hall.id}`)} />
        </Grid>
      ))}
    </Grid>
  );
}
